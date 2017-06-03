angular.
	module('loginHelpDesk').
		component('loginHelpDesk',{
			templateUrl: 'login-help-desk/login-help-desk.template.html',   // Note: The URL is relative to our `index.html` file
			controller: ['$http', '$routeParams', function LoginHelpDeskController($http, $routeParams){
				var self = this;			

				self.changeLanguage = function(lang){
					if(lang == "es" || lang == "en" ){
						$http({
							method: 'GET',
							url: 'dictionaries/' + lang +'/login-help-desk.' + lang +'.json'
						}).success(function(data){
							if(typeof(data) == 'object'){
								self.title = data.title;
								self.description = data.description;
								self.language = data.language;
								self.spanish = data.spanish;
								self.title_login = data.title_login;
							}else{
								alert('Error al intentar recuperar el cliente');
							}
						}).error(function(){
							alert('Error al intentar recuperar el cliente');
						});

						//INicializar con JS los componentes de SemanticUI que necesitan JS
						initCompsSemanticUI();	
					}else{
						self.lang = 'en';
						self.path = window.location.pathname;
						window.location = self.path + '#!/' + self.lang +'/login';
					}
				}
				//FUncion a ejecutar cuando se cambia el valor del dropdown
				self.checkLanguage = function(lang){
					if(lang == self.lang){ //Si se está seleccionando el lenguaje actual, no se hace nada
						//alert("Ya estas en:" + lang);
					}else{
						//alert("Quieres cambiar a:" + lang);
						//self.changeLanguage(lang);
						var self2 = this; //This referente a la funcion, NO al controlador
						self2.path = window.location.pathname;//(Pude haberla declarado como global)
						window.location = self2.path + '#!/' + lang +'/login';
					}
				}
				//Cargar en el idioma correcto cuando se ingresa URL (Cuando se carga por primera vez el componente)
				self.lang = $routeParams.lang;
				self.changeLanguage(self.lang); //
			}
			]
		});