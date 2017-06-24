angular.
	module('barraFooter').
		component('barraFooter', {
			templateUrl: 'barra-footer/barra-footer.template.html',
			controller: ['$http', '$routeParams', function BarraFooterController($http, $routeParams){
				var self = this;

				self.changeLanguage = function(lang, section){
					if(lang == "es" || lang == "en"){ //Se se ingreso un lenguaje permitido
						$http({ 
							method: 'GET',
							url: 'dictionaries/' + lang + '/barra-footer.' + lang + ".json"
						}).success(function(data){
								if(typeof(data) == 'object'){
									console.log(data);
									self.socialNetworks	= 	data.socialNetworks;
									self.responsable	= 	data.responsable;
									
								}
							}).error(function(){
								console.log("Error al recuperar el idioma");
							});
					}else{ //Sino se ingreso un idioma correcto pero tal vez si una sección correcta
						lang = "en";
						var self2 = this;
						self2.path = window.location.pathname;
						window.location = self2.path + "#!/" + lang + "/" + self.section;
					}
				}

				self.section = $routeParams.section;
				self.lang = $routeParams.lang;
				self.changeLanguage(self.lang, self.section);
				initCompsSemanticUI();
			}]
		});


