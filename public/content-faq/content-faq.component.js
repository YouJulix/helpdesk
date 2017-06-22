angular.
	module('contentFaq').
		component('contentFaq',{
			templateUrl: 'content-faq/content-faq.template.html',
			controller: ['$http', '$routeParams', function ContentFaqController($http, $routeParams){
				var self = this;
				
				self.changeLanguage = function(lang, section){
					if(lang == "es" || lang == "en"){ //Se se ingreso un lenguaje permitido
						//if(section == "welcome" || section == "bienvenido" || section == "reportes" || section == "reports" || section == "servicios" || section == "services" || section == "faq" || section == "busqueda" || section == "search"){//Secciones permitidas
							$http({ 
								method: 'GET',
								url: 'dictionaries/' + lang + '/content-faq.' + lang + ".json"
							}).success(function(data){
								self.faqslang = data.faqs;
							}).error(function(err){
								console.log(err);
							});
					}else{ //Sino se ingreso un idioma correcto pero tal vez si una sección correcta
						//self.changeLanguage("en");
						lang = "en";
						var self2 = this;
						self2.path = window.location.pathname;
						window.location = self2.path + "#!/" + lang + "/" + self.section;
					}
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
				self.section = $routeParams.section;
				self.lang = $routeParams.lang;

				self.changeLanguage(self.lang, self.section);
				self.getfaqs();
			}]
		});