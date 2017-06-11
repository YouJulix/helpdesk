angular.
	module('contentReportes').
		component('contentReportes',{
			templateUrl: 'content-reportes/content-reportes.template.html',
			controller: ['$http', '$routeParams', function ContentReportesController($http, $routeParams){
				var self = this;

				self.section = $routeParams.section;
				self.lang = $routeParams.lang;
				//self.setLanguage(self.lang, self.section);

				initCompsSemanticUI();	
			}]
		});
