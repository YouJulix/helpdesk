angular.
	module('contentAdminFaq').
		component('contentAdminFaq',{
			templateUrl: 'content-admin-faq/content-admin-faq.template.html',
			controller : ['$http', function($http){
				var self = this;
				self.saveFaq = function(){

					var newdata = {
						"idfaq"  : "Nova-faq-" + Math.floor(Math.random() * 999999),
						"title"  : self.title,
						"content": self.content
					}

					$http({
					 	method:'POST',
						url   :"http://localhost:8000/api/v1.0/faqs/",
						data  : newfaq
					}).success(function(data){
						//console.log(data);
						self.faqs = data;
					}).error(function(error){
						console.log(error);
					});
				}

				self.getfaqs = function(){
					$http({
					 	method:'GET',
						url:"http://localhost:8000/api/v1.0/faqs/"
					}).success(function(data){
						//console.log(data);
						self.faqs = data;
					}).error(function(error){
						console.log(error);
					});
				}
				self.getfaqs();
				//initCompsSemanticUI();
			}]
		});