var mongoose = require('mongoose');
//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Internet = mongoose.model('internetService');
//Instancia del modelo reportes

exports.findAllServices =  function(request, response){
	Internet.find(function(errno, internet){
		if(errno)
			response.send(500, errno.message);
		console.log('GET/Allservices')
		response.status(200).jsonp(internet);
	});
}

exports.findServiceByUser = function(request, response){
	Internet.find( {userId : request.params.user}, function(errno, internet){
		if(errno)
			response.send(500, errno.message);
		console.log('GET/services/:user')
		response.status(200).jsonp(internet);
	});
}

exports.addService = function(request, response){
	console.log(request.body);
	var newService = new Internet({
		internetServiceId	: request.body.internetServiceId,
		userId				: request.body.userId,
		serviceMode			: request.body.serviceMode,  
		status				: request.body.status,
		location			: request.body.location,
		/*Si el tipo de servicio es externo serán llenados los sig campos*/
		mac					: request.body.mac,
		/*Si el tipo de servicio es interno llenar los siguientes datos*/
		fechafin			: request.body.fechafin,
		fechaInit			: request.body.fechaInit,
		urls				: request.body.urls
	});

	newService.save(function(errno, service){
		if (errno) 
			return response.status(500).send(errno.message);

		response.status(200).jsonp(service);
	});
}