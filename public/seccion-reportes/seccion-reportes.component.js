angular.
	module('seccionReportes').
		component('seccionReportes', {
			templateUrl: 'seccion-reportes/seccion-reportes.template.html',
			controller: ['$routeParams', function seccionReportes($routeParams){
				var self = this;
				self.seccion = $routeParams.section;
				/*
					Funcionalidad pendiente
				*/
			}]
		});