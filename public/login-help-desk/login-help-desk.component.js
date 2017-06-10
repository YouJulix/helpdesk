angular.
	module('loginHelpDesk').
		component('loginHelpDesk',{
			templateUrl: 'login-help-desk/login-help-desk.template.html',   // Note: The URL is relative to our `index.html` file
			controller: ['$http', '$routeParams', function LoginHelpDeskController($http, $routeParams){
				var self = this;			

				self.dataValid = true; //¿Datos validos?// Boleano que servirá para saber si se muestra o no un mensaje de error de login.//Al inicio no se muestra

				self.changeLanguage = function(lang){
					if(lang == "es" || lang == "en" ){
						$http({
							method: 'GET',
							url: 'dictionaries/' + lang +'/login-help-desk.' + lang +'.json'
						}).success(function(data){ //Data se vuelca a un objeto(Proveniente de un objeto JSON)
							if(typeof(data) == 'object'){
								self.title = data.title;
								self.description = data.description;
								self.languageLabel = data.languageLabel;
								self.spanishLabel = data.spanishLabel;
								self.englishLabel = data.englishLabel;
								self.title_login = data.title_login;
								self.rectoryLabel = data.rectoryLabel;
								self.platformsVirtualLabel = data.platformsVirtualLabel;
								self.emailLabel = data.emailLabel;
								self.passwordLabel = data.passwordLabel;
								self.signInLabel = data.signInLabel;
								self.headerMessageError = data.headerMessageError;
								self.messageError = data.messageError;
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
				switch(self.lang){
					case "en":
						self.flag = "us";
						break;
					case "es":
						self.flag = "mx";
						break;
				}


				self.validateData = function(){
					//alert("Se validarán tus datos: " + self.email +", " + self.password);
					$http({
						method: 'GET',
						//url: 'localhost:8000/api/v1.0/users/' + self.email + "/" + self.password //NO Funciona
						url: 'http://localhost:8000/api/v1.0/users/' + self.email + "/" + self.password //Es necesario ponerle http:// al inicio para que funcione
					}).success(function(data){ //Data es un array con un(os) objeto(s)
						if(typeof(data) == 'object'){
							//console.log(data);
							if(data == ""){ //Si no se encuentra ningun usuario con ese user y ese password
								self.dataValid = false; //Boolean activará mensaje de error en la vista
							}else{
								self.dataValid = true;
								console.log(data);
								//Cambiar a otra locacion de los routes //De la Single Page Application
								//window.location = "/#!/es/bienvenido"; //De la ruta, cambia lo que hay despues de index.html/
								//localStorage.setItem("email", data.email);//NO FUNCA
								localStorage.setItem("email", data[0].email);//NO FUNCA
								localStorage.setItem("admin", data[0].admin);
								if(data[0].admin == "false"){
									window.location = '#!/' + self.lang +'/bienvenido';
								}
								if(data[0].admin == "true"){
									//window.location = "/#!/" + self.lang +"/bienvenido";
									window.location = "#!/" + self.lang + "/admin";
								}
							}
						}else{
							alert('Error al intentar recuperar el cliente');
						}
					}).
					error(function(){
						alert('Error al intentar recuperar el cliente');
					});
				}
			}
			]
		});