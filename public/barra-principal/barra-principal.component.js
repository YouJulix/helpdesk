angular.
	module('barraPrincipal').
		component('barraPrincipal', {
			templateUrl: 'barra-principal/barra-principal.template.html',
			controller: ['$http', '$routeParams', function BarraPrincipalController($http, $routeParams){
				var self = this;

				self.changeLanguage = function(lang, section){
					if(lang == "es" || lang == "en"){ //Se se ingreso un lenguaje permitido
						//if(section == "welcome" || section == "bienvenido" || section == "reportes" || section == "reports" || section == "servicios" || section == "services" || section == "faq" || section == "busqueda" || section == "search"){//Secciones permitidas
							$http({ 
								method: 'GET',
								url: 'dictionaries/' + lang + '/barra-principal.' + lang + ".json"
							}).success(function(data){
								if(typeof(data) == 'object'){
									//Asigno palabras
									self.titleItem1 = data.titleItem1;
									self.titleItem2 = data.titleItem2;
									self.titleItem3 = data.titleItem3;
									self.titleItem4 = data.titleItem4;
									self.languageLabel = data.languageLabel;
									self.spanishLabel = data.spanishLabel;
									self.englishLabel = data.englishLabel;
									self.searchLabel = data.searchLabel;
									self.logOutLabel = data.logOutLabel;


									//Definire el elemento activo en base a la seccion que esten solicitando (NOta: el elemento será uno (el mismo aunque me lo piden en Inglés o en Español, pues su Id lo tiene fijo en Inglés) )
									switch(section){ //Agregaré la clase "active" al elemento activo
										case 'bienvenido':
										case 'welcome' :
											document.getElementById('bienvenido').className += " active"; //Es con un espacio para que el Navegador reconozca "active" como otro elemento de la lista de Clases de este elemento.
											break;
										case 'reportes':
										case 'reports' :
											document.getElementById('reportes').className += " active";
											break;
										case 'servicios':
										case 'services' :
											document.getElementById('servicios').className += " active";
											break;
										case 'faq' :
											document.getElementById('faq').className += " active";
											break; 
										default:
											//Redireccionar a welcome
											break;
									}

								}else{
									alert("Diccionario invalido");
								}
							}).error(function(){
								alert("Error al intentar recuperar idioma");
							});
					}else{ //Sino se ingreso un idioma correcto pero tal vez si una sección correcta
						//self.changeLanguage("en");
						lang = "en";
						var self2 = this;
						self2.path = window.location.pathname;
						window.location = self2.path + "#!/" + lang + "/" + self.section;
					}
				}

				self.checkLanguage = function(lang){
					if(lang == self.lang){
						//Estas seleccionando el idioma en el que ya está actualmente la página
					}else{
						var self2 = this;
						self2.path = window.location.pathname;
						window.location = self2.path + "#!/" + lang + "/" + self.section;
					}
				}
				self.section = $routeParams.section;
				self.lang = $routeParams.lang;
				//alert("lang: " + self.lang + " , section: " + self.section);
				
				self.changeLanguage(self.lang, self.section);
				switch(self.lang){
					case "en":
						self.flag = "us";
						break;
					case "es":
						self.flag = "mx";
						break;
					default:
						self.flag = "us";
						break;
				}

				initCompsSemanticUI();	
			}]
		});