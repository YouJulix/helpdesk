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

exports.updateService = function(request, response){
	Service.find({ userId : req.params.user }, function(errno, service){ //busco elemento a actualizar(mongoose guarda su _id)
		service[0].nombreSoftware	=	request.body.nombreSoftware;
		service[0].versionSoftware 	=	request.body.versionSoftware;
		service[0].numeroEquipos 	=	request.body.numeroEquipos;
		service[0].aula 			=	request.body.aula;
		service[0].materia 			=	request.body.materia;
		service[0].fechaInit		= 	request.body.fechaInit;
		service[0].fechaFinal 		= 	request.body.fechaFinal;
		service[0].fechaDescarga 	= 	request.body.fechaDescarga;
		service[0].comentarios 		=	request.body.comentarios;
		service[0].status			=	request.body.status;
		service[0].solucion			=	request.body.solucion;

		service[0].save(function(errno){
			if(errno)
				return response.status(500).send(errno.message);
			console.log("PUT/services/:user");
			response.status(200).send(service);
		})
	})
}

exports.deleteService = function(request, response){
	Service.find({ userId : req.params.user }, function(errno, service){ //busco elemento a actualizar(mongoose guarda su _id)
		service[0].remove(function(errno){ //Find regresa un array, debemos tomar el primer y único elemento que regreso ( en la posicion [0])
			if(errno)
				return response.status(500).send(errno.message);
			console.log('DELETE/services/:user');
			response.status(200).send();
		})
	})
}

