angular.
	module('seccionServicios').
		component('seccionServicios', {
			templateUrl: 'seccion-servicios/seccion-servicios.template.html',
			controller: ['$routeParams', function SeccionServicios($routeParams){
				var self = this;
				self.seccion = $routeParams.section;

				
			}]
		});
