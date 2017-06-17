angular.
	module('contentServicios').
		component('contentServicios',{
			templateUrl: 'content-servicios/content-servicios.template.html',
			controller: ['$http', '$routeParams', function ContentServiciosController($http, $routeParams){
				var self = this;

				self.setLanguage = function(lang, section){
					if(lang == "es" || lang == "en"){ //Si se ingreso un lenguaje permitido
						$http({ 
							method: 'GET',
							url: 'dictionaries/' + lang + '/content-servicios.' + lang + ".json"
						}).success(function(data){
							if(typeof(data) == 'object'){
								//Asigno palabras
								self.main_title = data.main_title;
								self.main_icon = data.main_icon;
								self.sections = data.sections;
							}else{
								alert("Diccionario invalido");
							}
						}).error(function(){
							alert("Error al intentar recuperar idioma");
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
				self.setLanguage(self.lang, self.section);

				initCompsSemanticUI();	
			}]
		});
