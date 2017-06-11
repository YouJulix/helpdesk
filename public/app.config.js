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
								//return "Has lo tuyo admin";
								//return "<barra-admin></barra-admin>";
								window.location = "#!/" + urlAttr.lang + "/admin/notificaciones";
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
									//return "Has lo tuyo admin";
									//return "<barra-admin></barra-admin>";
									window.location = "#!/" + urlAttr.lang + "/admin/notificaciones";
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
				when('/:lang/:section/:submenu',{
					template: function(urlAttr){ //Objeto que cacha los key,,valor de la URL
						switch(urlAttr.section){
							case "admin": //Entran a la ruta admin
								if(localStorage.getItem("admin")=="true"){	
									var subseccion = urlAttr.submenu;
									if( subseccion == "notificaciones"){
										subseccion = "notific"; //LO cambio porque mi componente se llama <seccion-admin-notific> //LO hice así para ahorrar espacio, pero en la URL sí debe marcarse '.../notificaciones'
									}
									return "<seccion-admin-" +  subseccion + "></seccion-admin-"  + subseccion + ">";
								}else{
									window.location = "#!/" + urlAttr.lang + "/login";
								}
								break;
							default :
								return "<seccion-" + urlAttr.section + "></seccion-" + urlAttr.section + ">";
						}
					}
				}).
				when('/:lang/admin/notificaciones/reporte/:idReporte', {
					template : function(urlAttr){
						if(localStorage.getItem("admin") == "true"){//Si un administrador está logueado e intenta entrar a una seccion de un usuario NO administrador
							return '<reporte-admin></reporte-admin>';
						}else{
							window.location = "#!/" + urlAttr.lang + "/login";	
						}
					}
				}).
				when('/:lang/admin/notificaciones/servicio/:tipoServicio/:idSolicitud', {
					template : function(urlAttr){
						if(localStorage.getItem("admin") == "true"){//Si un administrador está logueado e intenta entrar a una seccion de un usuario NO administrador
							return '<servicio-' + urlAttr.tipoServicio + '-admin></servicio-' + urlAttr.tipoServicio +'-admin>';								
						}else{
							window.location = "#!/" + urlAttr.lang + "/login";	
						}
					}
				}).
				otherwise('/es/login');
			}
		]);