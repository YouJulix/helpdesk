angular.
	module('chatAdmin').
		component('chatAdmin', {
			templateUrl: 'chat-admin/chat-admin.template.html',
			controller: ['$http', function chatAdminController($http){
				var self = this;
				
				self.users;
				$http({
					method : 'GET',
					url : 'http://localhost:8000/api/v1.0/users'
				}).success(function(data){ //Array de objetos
					self.users = data;
					self.totalUsers = self.users.length-1;//-1 porque no contaremos al usuario NOvaDesk(superadmin)
					//console.log(self.users);
				}).error(function(){
					alert("Error recuperando Usuarios");
				});

				//COmportamiento
				self.openChat = function(id){
					$('.conversation#'+id).slideToggle(300); //QUe tenga la clase y el id, 'chat-'+id
					//$('#'+id).slideToggle(300); //Podria ser solo el id
				}
				self.total_popups = 0;
				self.popups = [];

				self.nombreEscapado = function(name){ //Escapamos el nombre porque un #id no puede tener espacios
					return name.replace(/ /g, "__");//Remplazo todos los espacios en blanco con 2 guiones bajos, Para que sea entendible por JQuery, JS//with g flag to replace all instances: (Expresion regular)
				}
				//Agregar metodo remove a los 	Array
		        Array.remove = function(array, from, to) {
		            var rest = array.slice((to || from) + 1 || array.length);
		            array.length = from < 0 ? array.length + from : from;
		            return array.push.apply(array, rest);
		        };
				
				self.register_popup = function(id, name){
					id = self.nombreEscapado(id);//Mando a escapar el id para que sea entendible por JQuery, JS
					for(var iii = 0; iii < self.popups.length; iii++){//Ya hay popus abiertos? //Al recargar la pag. no entra ni una vez. popusp.length = 0
						if( id == self.popups[iii]){ //Si el que seleccione ya esta abierto
							Array.remove(self.popups, iii); //Remueve de i, iii
							self.popups.unshift(id);//Se vuelve a agregar pero esta vez al inicio
							self.calculate_popups();
							return; //Acaba la funcion
						}
					}
					if(!(document.getElementById(id)!=null && document.getElementById(id) !=undefined)){
					//Si el nodo con id=data.nickname  es igual a null o es igual a undefined entonces: NO se ha abierto un popup para el usuario con id = data.nickname 
					//Creamos dicho popup
						var element = '<div class="conversation" id="'+id+'">';
							element +=		'<a href="javascript:close_popup('+"'"+id+"'"+')"><div class="conversation__header" >';
							//element +=		'<div class="conversation__header" ng-click="$ctrl.close_popup('+"'"+id+"'"+')" >';//No funciona ng-click cuabndo se crea desde un string y se inserta en el body
							element += 			'<i class="icon circle small green"></i>';
							element += 			'<i class="icon user large"></i>';
							//element +=			id;
							element += 				id.replace(/__/g, " "); // quito los guiones bajos que agregue para que el nombre sea entendible(Por las personas)
							element +=			'<span class="close-msg">&times;</span>';
							element +=		'</div></a>';
							//element +=		'</div>';
							element +=		'<ul chatboxId="'+ id.replace(/__/g, " ") +'" class="chat">'; //quito los guiones bajos(id.replace(/__/g, " ")) porque cuando recibo un mensaje se compara el nombre real con este atributo
							element +=			'<!--Mensajes-->';
							element +=		'</ul>';
							element +=		'<input class="message" chatboxid="'+id.replace(/__/g, " ")+'" type="text" placeholder="Escribir mensaje" />';//quito los guiones bajos(id.replace(/__/g, " ")) porque cuando envio un mensaje se envia este atributo como variable 'receiver'
							element += '</div>' ;
						//$('body').append(element);//Agregar al final del body
						$('#areaPopups').append(element);
					}
					self.popups.unshift(id); //AGREGAMOS AL INICIO este nuevo popup//unshift() 	add new items to the beginning of an array
					self.calculate_popups(); //Calculamos cuantos popus caben(Para saber cuantos vamos a ocultar y cuantos a mostrar)
					$('#message_'+id).focus(); //
				}

				self.calculate_popups = function(){//Calcular cuantos popups caben en tu navegador 
					//en base al ancho de tu pantalla(Cada popup mide 320px)
		        	var width = window.innerWidth;
		            if(width < 540){
		            	self.total_popups = 0;
		            }else{
		            	width = width - 200; //-200px del sidebar
		            	self.total_popups = parseInt(width/320);//Cuantos popus caben el total de pantalla restante(Despues de No contar sidebar)
		            }
		            self.display_popups();
				}

				self.display_popups = function(){
					var right = 220; //Espacio entre el primer popup y el lado derecho de la ventana/contenedor
		            var iii = 0;
		            for(iii; iii < self.total_popups; iii++){
		            	if(self.popups[iii] != undefined){ //Si no se guardó un undefined en nuestro array//Esto es equivalente a decir que SI en la BD el atributo data.nickname del objeto está guardado con un valor válido, y no un 'undefined'
		                	var element = document.getElementById(self.popups[iii]);//'<div class="popup-box chat-popup" id="'+ id +'">';
							if(element !=null && element!=undefined){ //Si está creado el popup(existe el id(nickname) para este usuario)
								//console.log(right);
								//console.log(self.popups);
				            	element.style.right = right + "px"; //Acomodalo en donde debe
				                right = right + 320; //Y prepara la identación para el siguiente elemento
				                element.style.display = "block";
							}
						}
				    }
				    //Esconder los popups que no se podrán mostrar, debido a que la pantalla ya no da(en caso de que el número de usuarios que te enviaron mensajes, sea mayor al total_popus que soporta tu pantalla)
				    for(var jjj = iii; jjj < self.popups.length; jjj++){
						var element = document.getElementById(self.popups[jjj]);
						if(element !=null && element!=undefined){
				                element.style.display = "none";
						}
		            }
				}
				//self.close_popup = function(id){
				close_popup = function(id){
		            for(var iii = 0; iii < self.popups.length; iii++){
		                if(id == self.popups[iii]){
		                    Array.remove(self.popups, iii);
		                    document.getElementById(id).style.display = "none";
		                    self.calculate_popups();
		                    return;
		                }
		            }   
		        }
				

				//Envio y eventos
				self.agregarEventos = function(){
					$('.js-trigger').on('click', function(){
					    $('html').toggleClass('show-me');
					});
					$('.conversation__header').on('click', function(){
						$('.conversation').slideToggle(300);
					});

					//$('.js-trigger').on('click', function(){
					    //$('.conversation').slideToggle(300);
						//$('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 300);//MUevo el scroll hasta abajo pero despues de 300 milisegundos, que es cuando el chat se abrio completamente y el scroll es del tamaño que debe
					//});
					var socket = io(); //Al ser la página principal creo el socket
				
					var oldDocs = '';
					//var socket = io(); //SOcket nuevo//SI lo pongo aquí cada que se importe el chat se creara un nuevo socket con evenos asociados, por lo tanto repetira acciones del socket anterior(Si es que llegara a existir)
					//var socket = io.connect('http://localhost:8000', {'forceNew': true});
					
					socket.on('load old msgs', function(docs){
						//$('.conversation').slideToggle(300);
						//alert("viejo");
						oldDocs = docs;
						cargarOldMensajes();
					});
					socket.off('new message');
					socket.on('new message',function(data){
							//alert("new message");
							AppendNewMsg(data);
						});		

					
					function cargarOldMensajes(){
						$.each(oldDocs,function(index, data){// data: objeto del array oldDocs, con campos: msg, sender, reciever, nickname
							AppendNewMsg(data);
						});	
						socket.off('load old msgs'); //QUitar la escucha del evento//Si no lo quitamos cada que se conecte alguien al servidor(socket) nuestro chat dibujara otra vez los chats guardados en la BD(duplicando, triplicando, etc.. los chats)
					}
					function AppendNewMsg(data){
						//console.log(data);
							if(self.currentUserId == data.reciever){
								//self.register_popup(data.nickname, data.nickname); //nickname = nickname de quien lo mandó
								//Para esta app no tengo nickname ya que el nickname se creaba en el evento 'new user'(El cual descarte) del servidor en el cual el nuevo usuario le enviaba su nickname
								self.register_popup(data.sender, data.sender);//Pero tenemos el atributo 'sender' que en sí es el que importa
								//DESACTIVADA LA INSTRUCCION ANTERIOR PARA QUE NO SE CREE EL POPUP
							}
							//Llenamos con mensajes el popup
							$.each($('.chat'),function(index,datax){ //Para cada caja de mensajes, auqellas que tengan su atributo chatboxid == data.reciever || chatboxid == data.sender
								if($(datax).attr('chatboxid')==data.reciever || $(datax).attr('chatboxid')==data.sender){//El mensaje me ivolucra?
									if(self.currentUserId == data.reciever){//Sí, te lo enviaron
										//$(datax).append("</br><div class='recieve'><b>"+data.nickname+": </b>"+data.msg+"</div>");
										$(datax).append("<li class='conversation__msg cf'>"+"<span>"+data.msg+"</span></li>");
										//$(datax).animate({scrollTop: $(datax)[0].scrollHeight}, 2000);
										$(datax).animate({scrollTop: $(datax)[0].scrollHeight}, 0);
									}else if( self.currentUserId == data.sender){ //Sí, lo enviaste
										//$(datax).append("</br><div class='send'><b>"+data.nickname+": </b>"+data.msg+"</div>");
										$(datax).append("<li class='conversation__msg cf'>"+"<span class='right'>"+data.msg+"</span></li>");
										//$(datax).animate({scrollTop: $(datax)[0].scrollHeight}, 2000);
										$(datax).animate({scrollTop: $(datax)[0].scrollHeight}, 0);
									}
								}
							});
						}

					self.currentUserId = localStorage.getItem("name");


					$(document).on( "keypress",'input.message', function(event) {//CUando document esté cargado
						var $messageBox = $(this); //this hace referencia al elemento que disparo el evento, el input en este caso
						if (event.which == 13 && !event.shiftKey && $messageBox.val()!= '' ){			
							//event.preventDefault();//LO quito porque este no es de tipo submit
							var $reciever = $(this).attr('chatboxid');
							//socket.emit('send message', {msg:$messageBox.val(),sender: $currentUserId, reciever:$reciever});
							socket.emit('send message', {msg:$messageBox.val(),sender: self.currentUserId, reciever:$reciever});
							$messageBox.val('');
						}
					});

				}
				self.agregarEventos();
			}]
	});
