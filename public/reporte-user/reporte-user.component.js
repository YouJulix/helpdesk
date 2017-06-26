angular.
	module('reporteUser').
		component('reporteUser', {
			templateUrl: 'reporte-user/reporte-user.template.html',
			controller: ['$http', '$routeParams', function($http, $routeParams){
				var self = this;

				self.section = $routeParams.section;
				self.lang = $routeParams.lang;
				
				self.usage = true;
				self.edit = false;
				self.idReporte = localStorage.getItem("idReporte");
				self.changeLanguage = function(lang, section){
						if(lang == "es" || lang == "en"){ //Se se ingreso un lenguaje permitido
							//if(section == "welcome" || section == "bienvenido" || section == "reportes" || section == "reports" || section == "servicios" || section == "services" || section == "faq" || section == "busqueda" || section == "search"){//Secciones permitidas
							$http({ 
								method: 'GET',
								url: 'dictionaries/' + lang + '/content-reportedit.' + lang + ".json"
							}).success(function(data){
								console.log(data);
								self.nreport  	= data.report;
								self.nfrom		= data.from;
								self.nstatus	= data.satatus;
								self.nlocation	= data.location;
								self.nassit		= data.assist;
								self.nclass		= data.OfficeCub;
								self.nlib		= data.library;
								self.nteacher	= data.teachers;
								self.nrectory	= data.rectory;
								self.nroomt		= data.roomTransmit;
								self.nvica		= data.viceRectoryA
								self.nvicm		= data.viceRectoryM;
								self.nequipment	= data.equipment;
								self.nspeak		= data.speaker;
								self.ncamera	= data.camera;
								self.nproject	= data.proy;
								self.ncontacts  = data.contacts;
								self.nlamp		= data.lamp;
								self.ntable		= data.table;
								self.nchair		= data.chair;
								self.nkeyboard	= data.keyboard;
								self.ninventary	= data.ninventary;
								self.noffice	= data.OfficeCub;
								self.ndescription 	= data.description;
								self.nresponse		= data.response;
								self.nback			= data.back;
								self.nedit 			= data.edit; 
								self.nsave			= data.save;
								self.ndelete		= data.delete;
							}).error(function(err){
								alert("Hubo un error en recuperar ellenguaje");
							});	
						}
				}

				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/reports/' + self.idReporte
				}).success(function(data){//Array de objetos
					self.reporte = data[0]; //Nos interesa sólo el primer y único elemento
					console.log(self.reporte);
				}).error(function(){
					alert("Error recuperando reporte");
				});

				self.deleteReporte = function(){
					var r = confirm("¿Estás seguro que deseas eliminar el reporte?");
					if(r == true){
						$http({
							method : 'DELETE',
							url : 'http://localhost:8000/api/v1.0/reports/' + self.idReporte
						}).success(function(data){//Array de objetos
							alert("Reporte eliminado exitosamente!");
							window.location = "#!/" + self.lang + "/reportes"
						}).error(function(){
							alert("Error al eliminar reporte");
						});
					}else{
						//No hagas nada
					}
				}
				
				self.updateReporte = function(){
					self.edit = false;
					self.usage = true;
					console.log(self.reporte);	
					$http({
						method : 'PUT',
						url : 'http://localhost:8000/api/v1.0/reports/' + self.idReporte,
						data : self.reporte
					}).success(function(data){//Array de objetos
						alert("Reporte actualizado exitosamente!");
					}).error(function(){
						alert("Error al actualizar reporte");
					});

				}

				self.modificar = function(){
					self.edit = true;
					self.usage = false;
				}

				self.back = function(){
					window.location = "#!/" + self.lang + "/reportes"
				}

				initCompsSemanticUI();
				self.changeLanguage(self.lang, self.section);
			}]
		});