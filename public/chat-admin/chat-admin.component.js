angular.
	module('chatAdmin').
		component('chatAdmin', {
			templateUrl: 'chat-admin/chat-admin.template.html',
			controller: function Chat(){
				agregarEventos();
			}
	});
