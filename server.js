var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var app = express();
var port = 8000;

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


//Api servicios software
var servSoftModel = require('./routes/servicio-software-api/servicio-software.schema'); 
var servSoftwCtrl = require('./routes/servicio-software-api/servicio-software.controller');
var servSoftwRoutes = require('./routes/servicio-software-api/servicio-software.routes'); 

//API ServiceInternet
var internet_routes = require('./routes/internet-api/internet.routes'); 
var InternetModel = require('./routes/internet-api/internet.schema'); 
var InternetCtrl = require('./routes/internet-api/internet.controller');

//Connection to BD
mongoose.connect(db.url);

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//IMPORTANTE! vamos a DEFINIR donde vamos a SERVIR la pagina web del FRONT END, index.html, style.css, bootstrap, angular, etc..
//app.use(express.static(__dirname + '/public')); //Igual funciona
app.use(express.static('public')); //Para el servicio de archivos estáticos como, por ejemplo, imágenes, archivos CSS y archivos JavaScript, utilice la función de middleware incorporado express.static de Express.


//API routes
users_routes.addAPIRouter(app, UserCtrl); //La funcion addAPIRouter enlaza rutas de un api que creamos a sus controladores(funciones); y hace que 'app' use esas rutas(app.use())
//API routes_Reportes
reportes_routes.addAPIRouter(app, ReportCtrl); //La funcion addAPIRouter enlaza rutas de un api que creamos a sus controladores(funciones); y hace que 'app' use esas rutas(app.use())
//API Servicio de Software
servSoftwRoutes.addAPIRouter(app, servSoftwCtrl);
//Api internet_service
internet_routes.addAPIRouter(app, InternetCtrl);
//Api faqs routes
faqs_routes.addAPIRouter(app,FaqCtrl);
//Start Server
app.listen(port, function(){
	console.log("Node server running on http://localhost:" + port);
});
