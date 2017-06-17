function initCompsSemanticUI(){
	$('.ui.accordion').accordion();
	$('.ui.dropdown').dropdown();
<<<<<<< HEAD
	$('.menu .item').tab();
}

/*Chat*/
/*
function agregarEventos(){
	$('.js-trigger').on('click', function() {
	    $('html').toggleClass('show-me');
=======
	$('.menu .item')
				  .tab()
				;
	
}

/*Chat*/
function agregarEventos(){
	$('.js-trigger').on('click', function() {
	    $('html').toggleClass('show-me') 
>>>>>>> ba06195018637b2e555e0412d61ba0da6a04cd50
	});

	$('.conversation__header').on('click', function() {
	    $('.conversation').slideToggle(300);
	});

	$('.chat__name').on('click', function() {
	    $('.conversation').slideToggle(300);
	});	
}
<<<<<<< HEAD
*/
=======
>>>>>>> ba06195018637b2e555e0412d61ba0da6a04cd50
