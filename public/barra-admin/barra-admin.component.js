angular.
	module('barraAdmin').
		component('barraAdmin',{
			templateUrl: 'barra-admin/barra-admin.template.html',
			controller : ['$routeParams', function BarraAdminController($routeParams){
				var self = this;

				self.selectLink = function(submenu){
					document.getElementById(submenu).className += " active"; //Es con un espacio para que el Navegador reconozca "active" como otro elemento de la lista de Clases de este elemento.
				}
				self.clearLocalStorage = function (){
					localStorage.clear();
				}

				self.submenu = $routeParams.submenu;
				self.lang = $routeParams.lang;
				self.selectLink(self.submenu);				
			}
			]
		});