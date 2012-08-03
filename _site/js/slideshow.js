
$(document).ready(function () {
	var slideshow = null;
	
	$('#main-media-link').lightBox({
    	overlayBgColor: '#000',
    	overlayOpacity: 0.9,
    	imageBlank: '/js/jquery/plugins/jquery.lightbox-0.5/images/lightbox-blank.gif',
    	imageLoading: '/js/jquery/plugins/jquery.lightbox-0.5/images/lightbox-ico-loading.gif',
    	imageBtnClose: '/js/jquery/plugins/jquery.lightbox-0.5/images/lightbox-btn-close.gif',
    	imageBtnPrev: '/js/jquery/plugins/jquery.lightbox-0.5/images/lightbox-btn-prev.gif',
    	imageBtnNext: '/js/jquery/plugins/jquery.lightbox-0.5/images/lightbox-btn-next.gif',
    	containerResizeSpeed: 500
    });
	
	
	$('#main-media-link, #click-to-hover').hover(
		function() {$("#click-to-hover").show();}
		, function() {$("#click-to-hover").hide();}
	);

	try {
	   	$(".tiny-thumbs li:first img").closest("li").addClass("active");
	}
	catch (e) {}
	
	if ($(".tiny-thumbs li img").size() > 1 && $(".tiny-thumbs li img.type-swf").size() == 0) {
    	
    	if (false) { //$.browser.msie && (parseInt($.browser.version) == 6)) {
    	
    	}
		else {    	
        	slideshow = window.setInterval(function() {
        		if ($(".tiny-thumbs li.active").next().size() == 1) {
        			$(".tiny-thumbs li.active + li img").click();
        		}
        		else { 
        			$(".tiny-thumbs li:first img").click();
        		}
        	}, 5000);
        }
	}
	

	$(".tiny-thumbs li img.type-image").each(function() {
		var pimg = new Image();
		pimg.src = $(this).attr("src").replace("_t.", "_m.");
	});
	
	$("#click-to-hover").click(function(){$("#main-media-link").click()});
	
    $(".tiny-thumbs li a, #main-media-link, #click-to-hover").click(function(event) {
    	if (slideshow && (event.button != undefined)) {
    		slideshow = window.clearInterval(slideshow);
    	}
    	return false;
    });
    
    $(".tiny-thumbs li img").click(function() {
    	$(".tiny-thumbs li").removeClass("active");
    	$(this).closest("li").addClass("active");
    
    	if ($(this).hasClass("type-image")) {
			var newSrc = $(this).attr("src").replace("_t.", "_m.");
			var w, h;
			var classesStr = $(this).attr("className");
			var classes = classesStr.split(" ");
			for (var i=0; i < classes.length; i++) {
				if (classes[i].indexOf("width-") == 0) {
					w = (classes[i].replace("width-", ""));
				}
				if (classes[i].indexOf("height-") == 0) {
					h = (classes[i].replace("height-", ""));
				}
			}
			
			$('#main-media-link').attr("href", newSrc.replace("_m.", "_l."));
			
			$("#media-space img").fadeOut(500, function() {
				$("#media-space img").attr("src", newSrc);
				if (w) { $("#media-space img").attr("width", w); }
				if (h) { $("#media-space img").attr("height", h); }
				$("#media-space img").fadeIn(500);
			});	
		}
		else {
			//...
		}
    });
    
    try {
    	$('#main-media-link').attr("href", $("#media-space img").attr("src").replace("_m.", "_l."));
    }
    catch(e) {}
    
});