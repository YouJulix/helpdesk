//API servicio software
var express = require('express');

exports.addAPIRouter = function(app, ServSoftCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var servsSoft = express.Router();
	
	servsSoft.route('/servicio-software')
		.get(ServSoftCtrl.findAllServiciosSoftw)
		.post(ServSoftCtrl.addServicioSoftw);
		
	servsSoft.route('/servicio-software/:idSolicitud') 
		.get(ServSoftCtrl.findServicioSoftwById);

	
	app.use("/api/v1.0", servsSoft); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}