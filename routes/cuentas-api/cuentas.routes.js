//API servicio cuentas
var express = require('express');

exports.addAPIRouter = function(app, CuentasServiceCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var cuentas = express.Router();
	
	cuentas.route('/cuentas')
		.get(CuentasServiceCtrl.findAllServices)
		.post(CuentasServiceCtrl.addService);
		
	cuentas.route('/cuentas/:user') 
		.get(CuentasServiceCtrl.findServiceByUser);

	
	app.use("/api/v1.0", cuentas); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}

