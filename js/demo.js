{
  const MathUtils = {
    map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
    lerp: (a, b, n) => (1 - n) * a + n * b,
    getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
  };

  const body = document.body;
  let winsize;
  const calcWinsize = () =>
    (winsize = { width: window.innerWidth, height: window.innerHeight });
  calcWinsize();
  window.addEventListener("resize", calcWinsize);

  let docScroll;
  let lastScroll;
  let scrollingSpeed = 0;
  const getPageYScroll = () =>
    (docScroll = window.pageYOffset || document.documentElement.scrollTop);
  window.addEventListener("scroll", getPageYScroll);

  // SmoothScroll
  class SmoothScroll {
    constructor() {
      this.DOM = { main: document.querySelector("main") };
      this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");
      this.items = [];
      this.renderedStyles = {
        translationY: {
          previous: 0,
          current: 0,
          ease: 0.1,
          setValue: () => docScroll
        }
      };
      this.setSize();
      this.update();
      this.style();
      this.initEvents();
      requestAnimationFrame(() => this.render());
    }
    update() {
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[
          key
        ].previous = this.renderedStyles[key].setValue();
      }
      this.layout();
    }
    layout() {
      this.DOM.scrollable.style.transform = `translate3d(0,${-1 *
        this.renderedStyles.translationY.previous}px,0)`;
    }
    setSize() {
      body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
    }
    style() {
      this.DOM.main.style.position = "fixed";
      this.DOM.main.style.width = this.DOM.main.style.height = "100%";
      this.DOM.main.style.top = this.DOM.main.style.left = 0;
      this.DOM.main.style.overflow = "hidden";
    }
    initEvents() {
      window.addEventListener("resize", () => this.setSize());
    }
    render() {
      scrollingSpeed = Math.abs(docScroll - lastScroll);
      lastScroll = docScroll;
      for (const key in this.renderedStyles) {
        this.renderedStyles[key].current = this.renderedStyles[key].setValue();
        this.renderedStyles[key].previous = MathUtils.lerp(
          this.renderedStyles[key].previous,
          this.renderedStyles[key].current,
          this.renderedStyles[key].ease
        );
      }
      this.layout();
      for (const item of this.items) {
        if (item.isVisible) {
          if (item.insideViewport) {
            item.render();
          } else {
            item.insideViewport = true;
            item.update();
          }
        } else {
          item.insideViewport = false;
        }
      }
      requestAnimationFrame(() => this.render());
    }
  }
  getPageYScroll();
  lastScroll = docScroll;
  new SmoothScroll();
}
