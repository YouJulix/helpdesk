function initCompsSemanticUI(){
	$('.ui.accordion').accordion();
	$('.ui.dropdown').dropdown();
	$('.menu .item').tab();
}

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
