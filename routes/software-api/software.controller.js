var mongoose = require('mongoose');
//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Software = mongoose.model('softwareService');
//Instancia del modelo reportes

exports.findAllServices =  function(request, response){
	Software.find(function(errno, software){
		if(errno)
			response.send(500, errno.message);
		console.log('GET/Allservices')
		response.status(200).jsonp(software);
	});
}

exports.findServiceByUser = function(request, response){
	Software.find( {userId : request.params.user}, function(errno, software){
		if(errno)
			response.send(500, errno.message);
		console.log('GET/services/:user')
		response.status(200).jsonp(software);
	});
}

exports.addService = function(request, response){
	console.log(request.body);
	var newService = new Software({
		idSolicitud 		: 	request.body.idSolicitud,
		softwareServiceId	: 	request.body.softwareServiceId,
		userId 				:	request.body.userId,
		serviceMode			: 	request.body.serviceMode,
		nombreSoftware 		: 	request.body.nombreSoftware,
		versionSoftware 	: 	request.body.versionSoftware,
		numeroEquipos 		: 	request.body.numeroEquipos,
		aula 				:	request.body.aula,
		materia 			:	request.body.materia,
		fechaInit			: 	request.body.fechaInit,
		fechaFinal 			: 	request.body.fechaFinal,
		fechaDescarga 		: 	request.body.fechaDescarga,
		comentarios 		:	request.body.comentarios,
		status				:	request.body.status,
		solucion			:	request.body.solucion
	});

	newService.save(function(errno, service){
		if (errno) 
			return response.status(500).send(errno.message);

		response.status(200).jsonp(service);
	});
}

