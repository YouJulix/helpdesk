var mongoose = require('mongoose');
//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Service = mongoose.model('Servicios');


exports.findAllServices = function(request, response){
	Service.find(function(errno, services){
		if(errno)
			response.send(500, errno.message);
		console.log('GET /services')
		response.status(200).jsonp(services);
	});
}

exports.findServicesByUSer = function(request, response){
	var IdUser = request.params.user;
	//console.log(request.params)
	console.log('GET /services/service');
	Service.find({"userId" : IdUser}, function(errno, service){
		if(errno)
			response.send(500, errno.message);
			response.status(200).jsonp(service);
	});
}

exports.findServiceById = function(request, response){
	console.log(request.params)
	Service.find({"idServicio" : request.params.idServicio}, function(errno, service){
		if(errno)
			response.send(500, errno.message);

		console.log('GET /services/idServicio');
		response.status(200).jsonp(service);
	});
}

exports.addService = function(request, response){
	console.log(request.body);
	var newService = new Service({
		userId				: request.body.userId,
		idServicio			: request.body.idServicio,
		nombreSoftware		: request.body.nombreSoftware,
		versionSoftware		: request.body.versionSoftware,
		numeroEquipo		: request.body.numeroEquipo,
		aula				: request.body.aula,
		materia				: request.body.materia,
		fechaLimite			: request.body.fechaLimite,
		comentarios			: request.body.comentarios,
		fecha				: request.body.fecha,
		estado				: request.body.estado,
		solucionProblema	: request.body.solucionProblema
	});

	newService.save(function(errno, service){
		if (errno) 
			return response.status(500).send(errno.message);

		response.status(200).jsonp(service);
	});
}

exports.updateService = function(req, res){
	Service.find({ "idServicio" : req.params.idServicio }, function(err, service){ //busco elemento a actualizar(mongoose guarda su _id)
		//el service retornado por el find es un array de un único elemento, lo convertimos en un objeto
		service[0].nombreSoftware	= req.body.nombreSoftware;
		service[0].versionSoftware	= req.body.versionSoftware;
		service[0].numeroEquipo		= req.body.numeroEquipo;
		service[0].aula				= req.body.aula;
		service[0].materia			= req.body.materia;
		service[0].fechaLimite		= req.body.fechaLimite;
		service[0].comentarios		= req.body.comentarios;
		service[0].estado			= req.body.estado;
		service[0].solucionProblema	= req.body.solucionProblema;

		service[0].save(function(err){
			if(err)
				return res.status(500).send(err.message);
			console.log("PUT /services/idServicio");
			res.status(200).send(service);
		})
	})
}

exports.deleteService = function(req, res){
	Service.find({ "idServicio" : req.params.idServicio }, function(err, service){ //busco elemento a eliminar(mongoose guarda su _id)
		service[0].remove(function(err){ //Find regresa un array, debemos tomar el primer y único elemento que regreso ( en la posicion [0])
			if(err)
				return res.status(500).send(err.message);
			console.log('DELETE /services/:idServicio');
			res.status(200).send();
		})
	})
}