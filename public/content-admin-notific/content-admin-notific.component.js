angular.
	module('contentAdminNotific').
		component('contentAdminNotific',{
			templateUrl: 'content-admin-notific/content-admin-notific.template.html',
			controller : ['$http', function($http){
				var self = this;
				self.reportes; //Array
				self.totalServicios = 0;

				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/reports'
				}).success(function(data){ //Array de objetos
					self.reportes = data;
					self.totalReportes = self.reportes.length;
				}).error(function(){
					alert("Error recuperando reportes");
				});


				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/servicio-software'
				}).success(function(data){ //Array de objetos
					self.serviciosSoftware = data;
					self.totalServSoftware = self.serviciosSoftware.length;
					self.totalServicios += self.totalServSoftware;
				}).error(function(){
					alert("Error recuperando servicios de software");
				});
				initCompsSemanticUI();
			}]
		});