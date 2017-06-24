angular.
	module('contentServicios').
		component('contentServicios',{
			templateUrl: 'content-servicios/content-servicios.template.html',
			controller: ['$http', '$routeParams', function ContentServiciosController($http, $routeParams){
				var self = this;
				
				self.changeLanguage = function(lang, section){
					if(lang == "es" || lang == "en"){ //Se se ingreso un lenguaje permitido
						$http({ 
							method: 'GET',
							url: 'dictionaries/' + lang + '/content-servicios.' + lang + ".json"
						}).success(function(data){
								if(typeof(data) == 'object'){
									console.log(data);
									self.addService		= 	data.addService;
									self.servicesTitle	= 	data.servicesTitle;
									self.code 			=	data.code;
									self.date			=	data.date;
									self.solicitud		=	data.solicitud;
									self.status			=	data.status;
									self.software		=	data.software;
									self.internet		=	data.internet;
									self.userAccount	=	data.userAccount;
									self.softwareInstallation	= data.softwareInstallation;
									self.softwareDownload	=	data.softwareDownload;
									self.nameSoftware	=	data.nameSoftware;
									self.versionSoftware	=	data.versionSoftware;
									self.numberEquipment	=	data.numberEquipment;
									self.classroom	=	data.classroom;
									self.matter		=	data.matter;
									self.dateLimit	=	data.dateLimit;
									self.commentInstallation	=	data.commentInstallation;
									self.nameDownload		=	data.nameDownload;
									self.versionDownload	=	data.versionDownload;																				
									self.dateDownload		=	data.dateDownload;
									self.commentDownload	= 	data.commentDownload;
									self.externalEquipment 	= 	data.externalEquipment;
									self.internalEquipment 	= 	data.internalEquipment;
									self.macAddress			= 	data.macAddress;
									self.connectionPlace	=	data.connectionPlace;
									self.classrooms			=	data.classrooms;
									self.library			=	data.library;
									self.assistantBuilding	=	data.assistantBuilding;
									self.teachersBuilding	=	data.teachersBuilding;
									self.electronicLaboratory	=	data.electronicLaboratory;
									self.dateEnd			=	data.dateEnd;
									self.initialHour		=	data.initialHour;
									self.hourEnd			=	data.hourEnd;
									self.url 				=	data.url;
									self.platform 			=	data.platform;
									self.aulaVirtual		=	data.aulaVirtual;
									self.kabl				=	data.kabl;
									self.activity			=	data.activity;
									self.accessPlatform		=	data.accessPlatform;
									self.recoveryPassword	=	data.recoveryPassword;
									self.descriptionProblem	=	data.descriptionProblem;
									self.listServices		=	data.listServices;
									self.send 				=	data.send;

									self.mode = self.externalEquipment;
									self.tipoSoftware = self.softwareInstallation;
									self.plataforma = self.aulaVirtual;
								}
							}).error(function(){
								alert("Error al recuperar el idioma");
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

				/* Mostrar los servicios en el modal */
				self.getServicesInternet = function(){
					$http({
						method 	: "GET",
						url 	: "http://localhost:8000/api/v1.0/internet/" + localStorage.getItem("email")
					}).success(function(data){
						console.log(data);
						self.servicesi = data;	//servicios de internet
						//initCompsSemanticUI();
						$('#modalServicios').modal('attach events', '#call-modals');
					}).error(function(error){
						console.log(error);
					});
				}

				self.getServicesInternet();

				/* Guardar la información de un servicio de Internet */
				self.saveServiceInternet = function(){
					//construir data
					var d = new Date(Date());
					self.data = {
						"userId"				: localStorage.getItem("email"),
						"internetServiceId"		: "Nova-Serv-Int-" + Math.floor(Math.random() * 999999),
						"serviceMode"			: self.mode,
						"status"				: "En Progreso",
						"location"				: self.lugar_conexion,
						"mac"					: self.mac,
						"fechaInit"				: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
						"fechafin"				: self.fecha,
						"urls"					: self.urls
					}
					$http({
						method 	: 'POST',
						url 	: 'http://localhost:8000/api/v1.0/internet',
						data	: self.data
					}).success(function(data){
						if(data){
							console.log(data);
							window.location.reload();
						}
					}).error(function(error){
						console.log(error);
						alert("Hubo problemas al enviar la solicitud, por favor intente otra vez");
					});
				}

				/* Mostrar los servicios en el modal */
				self.getServicesSoftware = function(){
					$http({
						method 	: "GET",
						url 	: "http://localhost:8000/api/v1.0/software/" + localStorage.getItem("email")
					}).success(function(data){
						console.log(data);
						self.servicess = data;	//servicios de internet
						$('#modalServicios').modal('attach events', '#call-modals');
					}).error(function(error){
						console.log(error);
					});
				}

				self.getServicesSoftware();

				/* Guardar la información de un servicio de software */
				self.saveServiceSoftware = function(){
					//construir data
					var d = new Date(Date());
					self.data = {
						"userId"			: localStorage.getItem("email"),
						"softwareServiceId"	: "Nova-Serv-Soft-" + Math.floor(Math.random() * 999999),
						"serviceMode"		: self.tipoSoftware,
						"nombreSoftware"	: self.nombre,
						"versionSoftware"	: self.version,
						"numeroEquipos"		: self.numero,
						"fechaInit"			: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
						"aula"				: self.aula,
						"materia"			: self.materia,
						"fechaFinal"		: self.fecha,
						"fechaDescarga"		: self.fechaDescarga,
						"comentarios"		: self.comentarios,
						"status"			: "En Progreso",
						"solucion"			: ""
					}
					$http({
						method	: 'POST',
						url 	: 'http://localhost:8000/api/v1.0/software/',
						data 	: self.data					
					}).success(function(data){
						if (data) {
							console.log(data);
							window.location.reload();
						}
					}).error(function(error){
						console.log(error);
						alert("Hubo problemas al enviar la solicitud, por favor intente otra vez");
					});
				}

				/* Mostrar los servicios en el modal */
				self.getServicesAccount = function(){
					$http({
						method 	: "GET",
						url 	: "http://localhost:8000/api/v1.0/cuentas/" + localStorage.getItem("email")
					}).success(function(data){
						console.log(data);
						self.servicesc = data;	//servicios de gestión de cuentas
						$('#modalServicios').modal('attach events', '#call-modals');
					}).error(function(error){
						console.log(error);
					});
				}

				self.getServicesAccount();

				/* guardar la información de un servicio de cuentas de usuario */
				self.saveServiceAccount = function(){
					//construir data
					var d = new Date(Date());
					self.data = {
						"userId"			: localStorage.getItem("email"),
						"cuentaServiceId"	: "Nova-Serv-Cuent-" + Math.floor(Math.random() * 999999),
						"serviceMode"		: self.plataforma,
						"fechaInit"			: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
						"actividad"			: self.actividad,
						"descripcion"		: self.descripcion,
						"status"			: "En Progreso",
						"solucion" 			: ""
					}
					$http({
						method	: 'POST',
						url 	: 'http://localhost:8000/api/v1.0/cuentas',
						data 	: self.data					
					}).success(function(data){
						if (data) {
							console.log(data);
							window.location.reload();
						}
					}).error(function(error){
						console.log(error);
						alert("Hubo problemas al enviar la solicitud, por favor intente otra vez");
					});
				}

			}]
		});