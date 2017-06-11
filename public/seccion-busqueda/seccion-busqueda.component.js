angular.
	module('seccionBusqueda').
		component('seccionBusqueda', {
			templateUrl: 'seccion-busqueda/seccion-busqueda.template.html',
			controller: ['$routeParams', function($routeParams){
				var self = this;

				alert("MOstrar resultados sobre: " + $routeParams.submenu);
			}]
		})