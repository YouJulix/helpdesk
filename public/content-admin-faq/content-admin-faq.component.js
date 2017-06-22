angular.
	module('contentAdminFaq').
		component('contentAdminFaq',{
			templateUrl: 'content-admin-faq/content-admin-faq.template.html',
			controller : ['$http', function($http){
				var self = this;
				initCompsSemanticUI();
			}]
		});