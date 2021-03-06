angular.
	module('servicioSoftwareAdmin').
		component('servicioSoftwareAdmin',{
			templateUrl: 'servicio-software-admin/servicio-software-admin.template.html',
			controller : ['$http', '$routeParams', function($http, $routeParams){ //$http, $routeParams, dependencias de angular
				var self = this;

				self.idSolicitud = $routeParams.idSolicitud;
				console.log(self.idSolicitud);
				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/software/id/' + self.idSolicitud
				}).success(function(data){//Array de objetos
					self.servicioSoftware = data[0]; //Nos interesa sólo el primer y único elemento
					//console.log(self.servicioSoftware);				
					switch(self.servicioSoftware.serviceMode){
						case "Instalación de software":
							//$('.ui.menu').find('.item').tab('change tab', 'instalacion_software');//Es lo mismo(solo que más largo) a:
							$('.menu .item').tab('change tab', 'instalacion_software');
							break;
						case "Descarga de software":
							//$('.ui.menu').find('.item').tab('change tab', 'descarga_software');//Es lo mismo(solo que más largo) a:
							$('.menu .item').tab('change tab', 'descarga_software');
							break;
					}
				}).error(function(){
					alert("Error recuperando reporte");
				});


				self.updateServSoftw = function(){
					console.log(self.servicioSoftware);
					$http({
						method : 'PUT',
						url : 'http://localhost:8000/api/v1.0/software/id/' + self.idSolicitud,
						data : self.servicioSoftware
					}).success(function(data){//Array de objetos
						alert("Solicitud de servicio actualizada exitosamente!");
					}).error(function(){
						alert("Error al actualizar solicitud");
					});	
				}
				self.deleteServSoftw = function(){
					var r = confirm("¿Estás seguro que deseas eliminar el reporte?");
					if(r == true){
						$http({
							method : 'DELETE',
							url : 'http://localhost:8000/api/v1.0/software/id/' + self.idSolicitud
						}).success(function(data){//Array de objetos
							alert("Solicitud de Servicio eliminada exitosamente!");
							window.location = "#!/es/admin/notificaciones";
						}).error(function(){
							alert("Error al eliminar solicitud");
						});
					}else{
						//No hagas nada
					}
				}
				
				$(document).ready(function(){
					initCompsSemanticUI();	
					$('#fechaLimite').calendar();
					$('#fechaDescarga').calendar();
				});
				

			}]
		});