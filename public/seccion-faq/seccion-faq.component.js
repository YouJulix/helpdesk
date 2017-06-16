angular.
	module('seccionFaq').
		component('seccionFaq', {
			templateUrl: 'seccion-faq/seccion-faq.template.html',
			controller: ['$routeParams', function SeccionFaqController($routeParams){
				var self = this;
				self.seccion = $routeParams.section;

				
			}]
		});
