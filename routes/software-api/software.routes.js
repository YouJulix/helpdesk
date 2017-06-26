//API servicio software
var express = require('express');

exports.addAPIRouter = function(app, SoftwareServiceCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var software = express.Router();
	
	software.route('/software')
		.get(SoftwareServiceCtrl.findAllServices)
		.post(SoftwareServiceCtrl.addService);
		
	software.route('/software/:user') 
		.get(SoftwareServiceCtrl.findServiceByUser);

	
	app.use("/api/v1.0", software); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}

