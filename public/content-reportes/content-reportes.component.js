angular.
	module('contentReportes').
		component('contentReportes',{
			templateUrl: 'content-reportes/content-reportes.template.html',
			controller: ['$http', '$routeParams', function ContentReportesController($http, $routeParams){
				var self = this;
				//self.locations;
				localStorage.removeItem("idReporte");
				self.changeLanguage = function(lang, section){
					if(lang == "es" || lang == "en"){ //Se se ingreso un lenguaje permitido
						//if(section == "welcome" || section == "bienvenido" || section == "reportes" || section == "reports" || section == "servicios" || section == "services" || section == "faq" || section == "busqueda" || section == "search"){//Secciones permitidas
							$http({ 
								method: 'GET',
								url: 'dictionaries/' + lang + '/content-reportes.' + lang + ".json"
							}).success(function(data){
								if(typeof(data) == 'object'){
									//console.log(data);
									self.addReport	= 	data.addReport;
									self.failReports= 	data.failReports
									self.code 		=	data.code;
									self.date		=	data.date;
									self.type		=	data.type;
									self.status		=	data.status;
									self.location	=	data.location;
									self.equipment	=	data.equipment;
									self.inventary	=	data.inventary;
									self.OfficeCub	=	data.OfficeCub;
									self.description=	data.description;
									self.assist		=	data.assist;
									self.classRoom	=	data.classRoom;
									self.library	=	data.library;
									self.teachers	=	data.teachers;
									self.rectory	=	data.rectory;
									self.viceRectoryM	=	data.viceRectoryM;
									self.viceRectoryA	=	data.viceRectoryA;
									self.roomTransmit	=	data.roomTransmit;
									self.send			= 	data.send;
									self.speaker		= data.speaker;
									self.camera			= data.camera;
									self.proy			= data.proy;
									self.contacts		= data.contacts;
									self.cpu			= data.cpu;
									self.lamp			= data.lamp;
									self.table			= data.table;
									self.mouse			= data.mouse;
									self.chair			= data.chair;
									self.keyboard 		= data.keyboard;
									

									self.edificio = self.classRoom;
									self.equipo = self.cpu;
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
				
				self.getReports = function(){
					$http({
						method 	: "GET",
						url 	: "http://localhost:8000/api/v1.0/reports/user/" + localStorage.getItem("email")
					}).success(function(data){
						console.log(data);
						self.reports = data;
						//initCompsSemanticUI();
						$('#modal1').modal('attach events', '#call-modals');
					}).error(function(error){
						console.log(error);
						alert("Problemas técnicos, por favor recargue la pagina");
						window.location.reload();
					});
				}

				self.getReports();
				
				self.saveReport = function(){
					//construir data
					var d = new Date(Date());
					self.data = {
						//NOTA
						"userId"				: localStorage.getItem("email"),
						"idReporte"				: "Nova-Rep-" + Math.floor(Math.random() * 999999),
						"edificio"				: self.edificio,
						"equipo"				: self.equipo,
						"numeroInventario"		: self.inventario,
						"numUbicacion"			: self.ubicacion,
						"descripcionProblema"	: self.descripcion,
						"fecha"					: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
						"estado"				: "En Progreso",
						"solucionProblema"		: ""
					}
					$http({
						method 	: 'POST',
						url 	: 'http://localhost:8000/api/v1.0/reports',
						data	: self.data
					}).success(function(data){
						if(data){
							console.log(data);
							window.location.reload();
						}
					}).error(function(error){
						console.log(error);
						alert("Hubo problemas al enviar el reporte, por favor intente otra vez");
					});
				}

				self.editReport =  function(index) {
					//console.log(index);
					localStorage.setItem("idReporte",index.idReporte);	
					window.location = "#!/" + self.lang + "/editreport"
				}

			}]
		});
