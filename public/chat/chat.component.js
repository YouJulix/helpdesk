//Servicios electronicos, comercio electronico, planeacion de servicios electronicos
angular.
	module('chat').
		component('chat', {
			templateUrl: 'chat/chat.template.html',
			controller: function ChatController(){
				self.agregarEventos = function(){
									/*$('.js-trigger').on('click', function(){
					    $('html').toggleClass('show-me');
					});*/
					$('.conversation__header').on('click', function(){
						$('.conversation').slideToggle(300);
					});

					/*$('.chat__name').on('click', function() {
						
					});	*/
					$('.js-trigger').on('click', function(){
					    $('.conversation').slideToggle(300);
						$('.chat').animate({scrollTop: $('.chat')[0].scrollHeight}, 300);//MUevo el scroll hasta abajo pero despues de 300 milisegundos, que es cuando el chat se abrio completamente y el scroll es del tamaño que debe
					});
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
							if(self.currentUserId == data.reciever){
								//self.register_popup(data.nickname, data.nickname); //nickname = nickname de quien lo mandó
								//Para este caso como es un solo chat, no es necesario mandar a registrar un popUp diferente
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
			}
	});
