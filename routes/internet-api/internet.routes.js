var express = require('express');

exports.addAPIRouter = function(app, InternetServiceCtrl){
	var internet = express.Router();

	internet.route('/internet')
		.get(InternetServiceCtrl.findAllServices)
		.post(InternetServiceCtrl.addService);

	internet.route('/internet/:user')
		.get(InternetServiceCtrl.findServiceByUser)
		.put(InternetServiceCtrl.updateService)
		.delete(InternetServiceCtrl.deleteService);

		
	app.use("/api/v1.0", internet); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}