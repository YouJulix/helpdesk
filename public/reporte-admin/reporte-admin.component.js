angular.
	module('reporteAdmin').
		component('reporteAdmin', {
			templateUrl: 'reporte-admin/reporte-admin.template.html',
			controller: ['$http', '$routeParams', function($http, $routeParams){
				var self = this;

				self.idReporte = $routeParams.idReporte;
				
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
							window.location = "#!/es/admin/notificaciones";
						}).error(function(){
							alert("Error al eliminar reporte");
						});
					}else{
						//No hagas nada
					}
				}
				
				self.updateReporte = function(){
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

				initCompsSemanticUI();
			}]
		});