angular.
	module('seccionEditreport').
		component('seccionEditreport', {
			templateUrl: 'seccion-editreport/seccion-editreport.template.html',
			controller: ['$routeParams', function seccionReportes($routeParams){
				var self = this;
				self.seccion = $routeParams.section;
				/*
					Funcionalidad pendiente
				*/
			}]
		});