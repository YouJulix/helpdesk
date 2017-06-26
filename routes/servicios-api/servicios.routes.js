//API Routers
var express = require('express');

exports.addAPIRouter = function(app, ServiceCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var services = express.Router();
	
	services.route('/services')
		.get(ServiceCtrl.findAllServices)
		.post(ServiceCtrl.addService);
		
	services.route('/services/:idServicio') 
		.get(ServiceCtrl.findServiceById)
		.put(ServiceCtrl.updateService)
		.delete(ServiceCtrl.deleteService);

	services.route('/services/user/:user') 
		.get(ServiceCtrl.findServicesByUSer);

	app.use("/api/v1.0", services); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}

/*
			findAllservices Buscara en todos los servicios
			findServicesByUSer Buscara servicios dado un usuario en especifico
			addService Agregar servicio
*/
