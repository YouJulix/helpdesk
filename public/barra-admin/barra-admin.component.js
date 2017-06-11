angular.
	module('barraAdmin').
		component('barraAdmin',{
			templateUrl: 'barra-admin/barra-admin.template.html',
			controller : ['$routeParams', function BarraAdminController($routeParams){
				var self = this;

				self.selectLink = function(submenu){
					switch(submenu){
						case 'notificaciones':
							document.getElementById(submenu).className += " active"; //Es con un espacio para que el Navegador reconozca "active" como otro elemento de la lista de Clases de este elemento.		
							break;
						case 'faq':
							document.getElementById(submenu).className += " active";
							break;
					}
					
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