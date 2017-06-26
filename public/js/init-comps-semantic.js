function initCompsSemanticUI(){
	$('.ui.accordion').accordion();
	$('.ui.dropdown').dropdown();
	$('.menu .item').tab();
}

<<<<<<< HEAD
=======
/*Chat*/
function agregarEventos(){
	$('.js-trigger').on('click', function(){
	    $('html').toggleClass('show-me');
	});

	$('.conversation__header').on('click', function(){
		$('.conversation').slideToggle(300);
	});

	$('.chat__name').on('click', function() {
		$('.conversation').slideToggle(300);
	});	
}
>>>>>>> 80403c07a1db635567be850a344b33be0d2546a0
