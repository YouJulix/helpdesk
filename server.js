var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var app = express();
var port = 8000;
//Variables para chat
//var express= require('express'),
//	app=express(),
server = require('http').createServer(app);
io = require('socket.io').listen(server);
//mongoose = require('mongoose'),

	users={};

	//Middlewares
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	
	//Connection to BD (Conexion directa)
	//mongoose.connect(db.url);

	//COnecction to BD(Conexion con mensaje)
	//var mongoURI = "mongodb://localhost/chatapp";
	var mongoURI = db.url;
	var MongoDB = mongoose.connect(mongoURI).connection;
	MongoDB.on('error', function(err) { console.log(err.message); });
	MongoDB.once('open', function() {
		console.log("mongodb connection open");
	});

var users_routes = require('./routes/users-api/users.routes'); //Routes y app.use(...) //NOta: no se le indica su extensión (.js)
var UserModel = require('./routes/users-api/users.schema'); //Instancio el codigo 'users.schema.js' en la variable UserModel, el codigo de 'users.schema.js' registra un schema al modelo 'User', para que posteriormente dicho modelo se pueda utilizar en el controlador (Busquedas sobre ese modelo base)
var UserCtrl = require('./routes/users-api/users.controller'); //Instancio el codigo 'users.controller.js' en la variable UserCtrl,

//Api reportes de usuarios
var ReportModel = require('./routes/reportes-api/reportes.schema'); 
var ReportCtrl = require('./routes/reportes-api/reportes.controller');
var reportes_routes = require('./routes/reportes-api/reportes.routes');
//Api faqs
var FaqModel = require('./routes/faq-api/faq.schema'); 
var FaqCtrl = require('./routes/faq-api/faq.controller');
var faqs_routes = require('./routes/faq-api/faq.routes'); 

//Api servicios
var ServModel = require('./routes/servicios-api/servicios.schema');
var ServiceCtrl = require('./routes/servicios-api/servicios.controller');
var servicios_routes = require('./routes/servicios-api/servicios.routes');

//Api servicios software
var SoftwareModel = require('./routes/software-api/software.schema'); 
var SoftwareCtrl = require('./routes/software-api/software.controller');
var software_routes = require('./routes/software-api/software.routes'); 

//API ServiceInternet
var internet_routes = require('./routes/internet-api/internet.routes'); 
var InternetModel = require('./routes/internet-api/internet.schema'); 
var InternetCtrl = require('./routes/internet-api/internet.controller');

//Api servicios cuentas de usuario
var CuentasModel = require('./routes/cuentas-api/cuentas.schema'); 
var CuentasCtrl = require('./routes/cuentas-api/cuentas.controller');
var cuentas_routes = require('./routes/cuentas-api/cuentas.routes'); 

//API routes
users_routes.addAPIRouter(app, UserCtrl); //La funcion addAPIRouter enlaza rutas de un api que creamos a sus controladores(funciones); y hace que 'app' use esas rutas(app.use())
//API routes_Reportes
reportes_routes.addAPIRouter(app, ReportCtrl); //La funcion addAPIRouter enlaza rutas de un api que creamos a sus controladores(funciones); y hace que 'app' use esas rutas(app.use())
//API routes_servicios
servicios_routes.addAPIRouter(app, ServiceCtrl);
//API Servicio de Software
software_routes.addAPIRouter(app, SoftwareCtrl);
//Api internet_service
internet_routes.addAPIRouter(app, InternetCtrl);
//API Servicio de Cuentas de Usuario
cuentas_routes.addAPIRouter(app, CuentasCtrl);
//Api faqs routes
faqs_routes.addAPIRouter(app,FaqCtrl);

	//Esquema para chat
	var chatSchema = mongoose.Schema({
		sender: String,
		nickname: String,
		reciever: String,
		msg: String,
		created: {type: Date, default: Date.now}
	});
	//Exportar modelo con esquema definido
	var ChatModel = mongoose.model('Message',chatSchema);

		

//IMPORTANTE! vamos a DEFINIR donde vamos a SERVIR la pagina web del FRONT END, index.html, style.css, bootstrap, angular, etc..
//app.use(express.static(__dirname + '/public')); //Igual funciona
	app.use(express.static('public')); //Para el servicio de archivos estáticos como, por ejemplo, imágenes, archivos CSS y archivos JavaScript, utilice la función de middleware incorporado express.static de Express.

	io.on('connection',function(socket){ //socket se crea cada que alguien se conecta, es el mismo proceso/funciones para cada usuario que se conecta
		console.log('new connection done');
		
		ChatModel.find({}, function(err, docs){
			if(err)throw err;
			console.log('sending old msgs');
			io.emit('load old msgs', docs);
			//console.log(docs);
		});

		socket.on('send message',function(data){
			console.log("Received message");
			var newMsg = new ChatModel({msg:data.msg, sender: data.sender, reciever: data.reciever,nickname:socket.nickname});
			newMsg.save(function(err){
				if(err){
					throw err;
				}else{
					console.log("Reply message");
					io.emit('new message',{msg:data.msg,sender: data.sender, reciever: data.reciever,nickname:socket.nickname});
				}
			});			
		});
		

		socket.on('disconnect', function(data){
			if(!socket.nickname) return;
			delete users[socket.nickname];
			updateNicknames();
		});
	});

	//Start Server socket.io
	server.listen(port, function(){ //AQUI ESTABA EL ERROR, PARA socket.io ahora se hará el listen sobre server, NO sobre app
		console.log("Node server running on http://localhost:" + port);
	});
	//Start Server
	//app.listen(port, function(){ //Esto cambio cuando se agrego el chat(Ahora es la variable 'server' quien tiene el listen)
	//	console.log("Node server running on http://localhost:" + port);
	//});