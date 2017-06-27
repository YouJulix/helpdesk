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
					url : 'http://localhost:8000/api/v1.0/software'
				}).success(function(data){ //Array de objetos
					self.serviciosSoftware = data;
					self.totalServSoftware = self.serviciosSoftware.length;
					self.totalServicios += self.totalServSoftware;
				}).error(function(){
					alert("Error recuperando servicios de software");
				});

				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/internet'
				}).success(function(data){ //Array de objetos
					self.serviciosInternet = data;
					self.totalServInternet = self.serviciosInternet.length;
					self.totalServicios += self.totalServInternet;
				}).error(function(){
					alert("Error recuperando cuentas de usuario");
				});


				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/cuentas'
				}).success(function(data){ //Array de objetos
					self.cuentasUsuario = data;
					self.totalCuentasUsuario = self.cuentasUsuario.length;
					self.totalServicios += self.totalCuentasUsuario;
				}).error(function(){
					alert("Error recuperando cuentas de usuario");
				});

				initCompsSemanticUI();
			}]
		});