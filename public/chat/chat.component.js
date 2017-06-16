angular.
	module('chat').
		component('chat', {
			templateUrl: 'chat/chat.template.html',
			controller: function Chat(){
				agregarEventos();
			}
	});
