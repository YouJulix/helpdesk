angular.
	module('helpDeskApp').
		config(['$locationProvider', '$routeProvider',
			function config($locationProvider, $routeProvider){
				$locationProvider.hashPrefix('!'); // We also used $locationProvider.hashPrefix() to set the hash-prefix to !. This prefix will appear in the links to our client-side routes, right after the hash (#) symbol and before the actual path (e.g. index.html#!/some/path).
				//Setting a prefix is not necessary, but it is considered a good practice (for reasons that are outside the scope of this tutorial). ! is the most commonly used prefix.
				//Al agregar este prefijo, en nuestros enlaces debemos colocar dicho prefijo: ejemplo:  <a href="#!/phones/{{phone.id}}>..."
				$routeProvider.when('/:lang/login',{
					//template: '<login-help-desk></login-help-desk>'
					template: function(urlAttr){
						if(localStorage.getItem("email") && localStorage.getItem("admin")){ //Si hay alguien logueado
							if(localStorage.getItem("admin")=="true"){
								return "Has lo tuyo admin";
							}
							if(localStorage.getItem("admin")=="false"){
								window.location = "#!/" + urlAttr.lang + "/bienvenido";
							}
						}else{
							return '<login-help-desk></login-help-desk>';
						}
					}
				}).
				when('/:lang/:section',{
					//template: '<barra-principal></barra-principal>'
					//templateUrl: '/pages/in.html'
					template: function(urlAttr){
						switch(urlAttr.section){
							case "admin": //Entran a la ruta admin
								if(localStorage.getItem("admin")=="true"){
									return "Has lo tuyo admin";
								}else{
									window.location = "#!/" + urlAttr.lang + "/login";
								}
								break;
							default:
								if(localStorage.getItem("email") && localStorage.getItem("admin")){ //Si hay alguien logueado
									if(localStorage.getItem("admin") == "true"){//Si un administrador está logueado e intenta entrar a una seccion de un usuario NO administrador
										window.location = "#!/" + urlAttr.lang + "/admin";	
									}
									if(localStorage.getItem("admin") == "false"){//Si un administrador está logueado e intenta entrar a una seccion de un usuario NO administrador
										return '<seccion-' + urlAttr.section + '></seccion-' + urlAttr.section + '>';
									}
								}else{
									window.location = "#!/" + urlAttr.lang + "/login";
								}
						}
					}
				}).
				otherwise('/es/login');
			}
		]);