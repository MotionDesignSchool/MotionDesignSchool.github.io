new WOW().init();

(function(jQuery) {


function noise_bg(canvas_item){
	const noise = () => {
	    let canvas, ctx;
	    let wWidth, wHeight;
	    let noiseData = [];
	    let frame = 0;
	    let loopTimeout;
	    // Create Noise
	    const createNoise = () => {
	        const idata = ctx.createImageData(wWidth, wHeight);
	        const buffer32 = new Uint32Array(idata.data.buffer);
	        const len = buffer32.length;

	        for (let i = 0; i < len; i++) {
	            if (Math.random() < 0.5) {
	                buffer32[i] = 0xff000000;
	            }
	        }
	        noiseData.push(idata);
	    };
	    // Play Noise
	    const paintNoise = () => {
	        if (frame === 9) {
	            frame = 0;
	        } else {
	            frame++;
	        }

	        ctx.putImageData(noiseData[frame], 0, 0);
	    };
	    // Loop
	    const loop = () => {
	        paintNoise(frame);

	        loopTimeout = window.setTimeout(() => {
	            window.requestAnimationFrame(loop);
	        }, (1000 / 25));
	    };
	    // Setup
	    const setup = () => {
	        wWidth = window.innerWidth;
	        wHeight = window.innerHeight;

	        canvas.width = wWidth;
	        canvas.height = wHeight;

	        for (let i = 0; i < 10; i++) {
	            createNoise();
	        }

	        loop();
	    };
	    // Reset
	    let resizeThrottle;
	    const reset = () => {
	        window.addEventListener('resize', () => {
	            window.clearTimeout(resizeThrottle);

	            resizeThrottle = window.setTimeout(() => {
	                window.clearTimeout(loopTimeout);
	                setup();
	            }, 200);
	        }, false);
	    };

	    // Init
	    const init = (() => {
	        canvas = canvas_item;
	        ctx = canvas.getContext('2d');
	        setup();
	    })();
	};

	noise();
};

var canvas_items = document.getElementsByClassName("noise");
for(var i = 0; i < canvas_items.length; i++){
	noise_bg(canvas_items.item(i));
	//console.log(canvas_items.item(i));
}


})(jQuery.noConflict());




(function(jQuery) {
	jQuery('.owl-carousel-testimonials').owlCarousel({
	    loop:false,
	    margin:10,
	    nav:false,
	    dots:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:2
	        }
	    }
	})
})(jQuery.noConflict());


(function(jQuery) {
	jQuery('.testiminial-item p').each(function(){
		//console.log($(this).text().length);
		if(jQuery(this).text().length>=160){
			var first = jQuery(this).text().substr(0, 160);
			var second = jQuery(this).text().substr(160);
			var new_str = first+'... </br>'+second;
			jQuery(this).html(new_str);
		}
	});
	jQuery('body').on('click', '.testiminial-item .more', function(event){
		event.preventDefault();
		jQuery(this).parent().find('p').toggleClass('open');
		jQuery(this).toggleClass('open');
	})
})(jQuery.noConflict());



(function(jQuery) {
    jQuery('a[href*=\\#]').click(function() {
	    if(this.hash.slice(1).length>=0){	
	    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	        && location.hostname == this.hostname) {
	    		if(this.hash.slice(1)){
	    			 var jQuerytarget = jQuery(this.hash);
		            jQuerytarget = jQuerytarget.length && jQuerytarget || jQuery('[name=' + this.hash.slice(1) +']');
		            if (jQuerytarget.length) {
		                var targetOffset = jQuerytarget.offset().top - 0; //#main-header - заменить на ваш элемент
		                jQuery('html,body').animate({scrollTop: targetOffset}, 1000);
		                return false;
		            }
	    		}
	        }
	    }
	});
})(jQuery.noConflict());



(function(jQuery) {
	jQuery(document).on("mousemove",".owl-carousel-testimonials", function(e){ 
		e.preventDefault();
		var x = e.clientX;
		var y = e.clientY;
		var newposX = x;
		var newposY = y; 
		jQuery(".circle").css({"left": newposX, "top": newposY});
	});

	jQuery(document).on("mouseover",".owl-carousel-testimonials", function(e){
		e.preventDefault();
		jQuery(".circle").show();
	});
	jQuery(document).on("mouseleave",".owl-carousel-testimonials", function(e){
		e.preventDefault();
		jQuery(".circle").hide();

	});

})(jQuery.noConflict());


(function(jQuery) {
	var top_old = jQuery(window).scrollTop();
	var scroll_speed;
	setInterval(function(){
		jQuery('.scroll-title').each(function(){
			if(top_old == jQuery(window).scrollTop()){
			}else{
				scroll_speed = top_old - jQuery(window).scrollTop();
				//console.log(scroll_speed);
				top_old = jQuery(window).scrollTop();
				//jQuery(this).css('transform', 'translate('+x_new+'px, 0px)');
			}

			width = jQuery(this).width();
			var matrix = jQuery(this).css('transform').replace(/[^0-9\-.,]/g, '').split(',');
			var x = matrix[12] || matrix[4];
			var y = matrix[13] || matrix[5];

			
				if(scroll_speed>=0){
					var x_new = Math.round(x)+10;
				}else{
					var x_new = Math.round(x)-10;
				}

			if(width>=Math.abs(x)){
				jQuery(this).css('transform', 'translate('+x_new+'px, 0px)');
			}else{
				if(scroll_speed>=0){
					jQuery(this).css('transform', 'translate(-'+width+'px, 0px)');
				}else{
					jQuery(this).css('transform', 'translate('+width+'px, 0px)');
				}
				
				console.log('reset');
			}
		})
	}, 1000);
})(jQuery.noConflict());


(function(jQuery) {
    jQuery('body').on('click','.menu-trigger', function(event) {
        event.preventDefault();
        if(jQuery(this).hasClass('open')){
        	jQuery('.main-nav').removeClass('open');
        	jQuery(this).removeClass('open');
        	jQuery('.main-header').removeClass('open');
        	jQuery('.main-header .logo').show();
        }else{
        	jQuery('.main-nav').addClass('open');
        	jQuery(this).addClass('open');
        	jQuery('.main-header').addClass('open');
        	jQuery('.main-header .logo').hide();
        }
    });
})(jQuery.noConflict());