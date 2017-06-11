var mongoose = require('mongoose');
var ServicioSoftw = mongoose.model('ServicioSoftware'); //MOdelo, instancia del modelo(con el Schema que nosotros creamos) que nosotros creamos//Pueden llamarse igual o diferente(la variable y el modelo) no hay prolema

exports.findAllServiciosSoftw = function(req, res){ //variables que reciben req = reques, res = response
	ServicioSoftw.find(function(err, serviciosSoftware){ //Esta funcion que está dentro del find(function(..){..}), se ejecutará despues de que el find() haya concluido
		if(err){ //sI HAY ERROR se responde con status 500 
			res.send(500, err.message); //Se envia respuesta y termina funcion
		}
		console.log('GET /servicio-software');
		res.status(200).jsonp(serviciosSoftware);
	});
}
exports.findServicioSoftwById = function(req, res){
	ServicioSoftw.find({ "idSolicitud" : req.params.idSolicitud }, function(err, servicioSoftware){
		if(err)
			res.send(500, err.message);
		console.log('GET /servicio-software/:idSolicitud');
		res.status(200).jsonp(servicioSoftware);
	});
}

exports.addServicioSoftw= function(req, res){
	console.log(req.body);
	var newServicioSoftw = new ServicioSoftw({ //Ahora la estructura que utilizaremos NO será temporal, sino que se guardará por eso instanciamos
		idSolicitud : 		req.body.idSolicitud,
		userId : 			req.body.userId,
		tipo			: 	req.body.tipo,
		nombreSoftware : 	req.body.nombreSoftware,
		versionSoftware : 	req.body.versionSoftware,
		numeroEquipos : 	req.body.numeroEquipos,
		date : 				req.body.date,
		aula : 				req.body.aula,
		materia : 			req.body.materia,
		fechaFinal : 		req.body.fechaFinal,
		comentarios : 		req.body.comentarios,
		estado		: 		req.body.estado,
		solucion	: 		req.body.solucion,
	});
	newServicioSoftw.save(function(err, servicioSoftware){ //con ...save() Guardamos la estructura instanciada anteriormente
		if(err){
			res.send(500, err.message);
			//return res.status(500).send(err.message); //otra forma de responder
		}
		console.log('POST /servicio-software');
		res.status(200).jsonp(servicioSoftware);

	})
}


exports.updateServicioSoftw = function(req, res){
	//Report.findReportById({ "idReporte" : req.params.idReporte }, //NOTA: Esto no funciona NO SE RECONOCE LA FUNCION findReportById en tiempo de ejecucion dentro de este bloque
	ServicioSoftw.find({ "idSolicitud" : req.params.idSolicitud }, function(err, servicioSoftw){ //busco elemento a actualizar(mongoose guarda su _id)
		servicioSoftw = servicioSoftw[0]; //el servicioSoftw  retornado por el find es un array de un único elemento, lo convertimos en un objeto
		servicioSoftw.tipo			= req.body.tipo;
		servicioSoftw.nombreSoftware	= req.body.nombreSoftware;
		servicioSoftw.versionSoftware	= req.body.versionSoftware;
		servicioSoftw.numeroEquipos		= req.body.numeroEquipos;
		servicioSoftw.date	= req.body.date;
		servicioSoftw.aula				= req.body.aula;
		servicioSoftw.materia	= req.body.materia;
		servicioSoftw.fechaFinal		= req.body.fechaFinal;
		servicioSoftw.comentarios	= req.body.comentarios;
		servicioSoftw.estado		= req.body.estado;
		servicioSoftw.solucion	= req.body.solucion;

//		report[0].save(function(err){
		servicioSoftw.save(function(err){
			if(err)
				return res.status(500).send(err.message);
			console.log("PUT /servicio-software/idSolicitud");
			res.status(200).send(ServicioSoftw);
		})
	})
}

exports.deleteServicioSoftw = function(req, res){
	//Report.findReportById({ "idReporte" : req.params.idReporte }, //NOTA: Esto no funciona NO SE RECONOCE LA FUNCION findReportById en tiempo de ejecucion dentro de este bloque
	ServicioSoftw.find({ "idSolicitud" : req.params.idSolicitud }, function(err, servicioSoftw){ //busco elemento a eliminar(mongoose guarda su _id)
		servicioSoftw[0].remove(function(err){ //Find regresa un array, debemos tomar el primer y único elemento que regreso ( en la posicion [0])
			if(err)
				return res.status(500).send(err.message);
			console.log('DELETE /servicio-software/:idSolicitud');
			res.status(200).send();
		})
	})
}