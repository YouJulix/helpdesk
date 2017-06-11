angular.
	module('barraContactos').
		component('barraContactos', {
			templateUrl: 'barra-contactos/barra-contactos.template.html',
			controller: [ '$http', '$routeParams', function BarraContactosController($http,$routeParams){
            	var self = this;
				self.changeLanguage = function(lang, section){
					if(lang == "es" || lang == "en"){ //Se se ingreso un lenguaje permitido
						//if(section == "welcome" || section == "bienvenido" || section == "reportes" || section == "reports" || section == "servicios" || section == "services" || section == "faq" || section == "busqueda" || section == "search"){//Secciones permitidas
							$http({ 
								method: 'GET',
								url: 'dictionaries/' + lang + '/barra-contactos.' + lang + ".json"
							}).success(function(data){
								if(typeof(data) == 'object'){
									self.rectoria 	= data.rectoria;
									self.contactos 	= data.contactos;
									self.viceRA		= data.viceRA;
									self.servicios	= data.servicios;
									self.redes		= data.redes;
									self.multimedios= data.multimedios;
									self.plataformas= data.plataformas;
								}
							}).error(function(){
								alert("Error en recuperar el idioma");
							});
					}else{ //Sino se ingreso un idioma correcto pero tal vez si una sección correcta
						//self.changeLanguage("en");
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
