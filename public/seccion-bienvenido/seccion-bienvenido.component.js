angular.
	module('seccionBienvenido').
		component('seccionBienvenido', {
			templateUrl: 'seccion-bienvenido/seccion-bienvenido.template.html',
			controller: ['$routeParams', function SeccionBienvenidoController($routeParams){
				var self = this;
				self.seccion = $routeParams.section;

				
			}]
		});