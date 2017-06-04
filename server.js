var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var db = require('./config/db');
var app = express();
var port = 8000;

var users_routes = require('./routes/users-api/users.routes'); //Routes y app.use(...)
var UserModel = require('./routes/users-api/users.schema'); //Instancio el codigo 'users.schema.js' en la variable UserModel, el codigo de 'users.schema.js' registra un schema al modelo 'User', para que posteriormente dicho modelo se pueda utilizar en el controlador (Busquedas sobre ese modelo base)
var UserCtrl = require('./routes/users-api/users.controller'); //Instancio el codigo 'users.controller.js' en la variable UserCtrl,

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

//Start Server
app.listen(port, function(){
	console.log("Node server running on http://localhost:" + port);
});
