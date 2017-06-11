angular.
	module('contentAdminNotific').
		component('contentAdminNotific',{
			templateUrl: 'content-admin-notific/content-admin-notific.template.html',
			controller : ['$http', function($http){
				var self = this;
				self.reportes; //Array

				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/reports'
				}).success(function(data){ //Array de objetos
					self.reportes = data;
					self.totalReportes = self.reportes.length;
				}).error(function(){
					alert("Error recuperando reportes");
				});

				initCompsSemanticUI();
			}]
		});