var mongoose = require('mongoose');
//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Cuenta = mongoose.model('cuentaService'); //MOdelo, instancia del modelo(con el Schema que nosotros creamos) que nosotros creamos//Pueden llamarse igual o diferente(la variable y el modelo) no hay prolema
//Instancia del modelo servico de cuentas

exports.findAllServices =  function(request, response){
	Cuenta.find(function(errno, cuenta){
		if(errno)
			response.send(500, errno.message);
		console.log('GET/Allservices')
		response.status(200).jsonp(cuenta);
	});
}

exports.findServiceByUser = function(request, response){
	Cuenta.find( {userId : request.params.user}, function(errno, cuenta){
		if(errno)
			response.send(500, errno.message);
		console.log('GET/services/:user')
		response.status(200).jsonp(cuenta);
	});
}

exports.addService = function(request, response){
	console.log(request.body);
	var newService = new Cuenta({
		idSolicitud 		: request.body.idSolicitud,
		cuentaServiceId		: request.body.cuentaServiceId,
		userId 				: request.body.userId,
		serviceMode			: request.body.serviceMode,	//serviceMode va a tomar el valor de la plataforma  
		status				: request.body.status,
		fechaInit			: request.body.fechaInit,
		actividad			: request.body.actividad,
		descripcion			: request.body.descripcion,
		solucion 			: request.body.solucion
	});

	newService.save(function(errno, service){
		if (errno) 
			return response.status(500).send(errno.message);

		response.status(200).jsonp(service);
	});
}

exports.updateService = function(request, response){
	Service.find({ userId : req.params.user }, function(errno, service){ //busco elemento a actualizar(mongoose guarda su _id)
		service[0].fechaInit		=	request.body.fechaInit;
		service[0].actividad		=	request.body.actividad;
		service[0].descripcion		=	request.body.descripcion;
		service[0].solucion 		=	request.body.solucion;

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








