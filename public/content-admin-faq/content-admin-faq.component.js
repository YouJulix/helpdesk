angular.
	module('contentAdminFaq').
		component('contentAdminFaq',{
			templateUrl: 'content-admin-faq/content-admin-faq.template.html',
			controller : ['$http', function($http){
				var self = this;

				self.title = "";
				self.content = "";
				self.metodo = "";

				self.nuevafaq = function(){
					self.title = "";
					self.content = "";
					self.metodo = "POST";
				}

				self.deletefaq = function(id_faq){
					var res = confirm('¿Seguro que deseas eliminar esta pregunta frecuente?');
					if(res == true){
						$http({
						 	method: "delete",
							url   : "http://localhost:8000/api/v1.0/faqs/" + id_faq,
						}).success(function(data){
							console.log(data);
							window.location.reload();
						}).error(function(error){
							alert(error);
						});	
					}else{
						//No hagas nada
					}
					
				}

				self.updatefaq = function(faq){
					self.title = faq.title;
					self.content = faq.content;
					self.metodo = "PUT";
					self.idfaqq = faq.idfaq;	
				}

				self.getfaqs = function(){
					$http({
					 	method:'GET',
						url:"http://localhost:8000/api/v1.0/faqs/"
					}).success(function(data){
						self.faqs = data;
					}).error(function(error){
						console.log(error);
					});
				}

				self.getfaqs();
				
				self.saveFaq = function(){
					var idfaqtemp = "";
					if(self.metodo=="POST"){
						idfaqtemp = "Nova-faq-" + Math.floor(Math.random() * 999999);
					}else{
						idfaqtemp = self.idfaqq; 
					}

					var newdata = {
						"idfaq"  : idfaqtemp,
						"title"  : self.title,
						"content": self.content
					}
					$http({
					 	method: self.metodo,
						url   : "http://localhost:8000/api/v1.0/faqs/",
						data  : newdata
					}).success(function(data){
						console.log(data);
						self.faqs = data;
						window.location.reload();
					}).error(function(error){
						console.log(error);
					});
				}
			}]
		});