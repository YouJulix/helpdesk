var mongoose = require('mongoose');
//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Report = mongoose.model('Reportes');
//Instancia del modelo reportes


exports.findAllReports = function(request, response){
	Report.find(function(errno, reports){
		if(errno)
			response.send(500, errno.message);
		console.log('GET /reports')
		response.status(200).jsonp(reports);
	});
}

exports.findReportsByUSer = function(request, response){
	var IdUser = request.params.user;
	console.log(request.params)
	Report.find({"userId" : IdUser}, function(errno, report){
		if(errno)
			response.send(500, errno.message);

		console.log('GET /reports/report');

		response.status(200).jsonp(report);
	});
}
exports.findReportById = function(request, response){
	console.log(request.params)
	//TVShow.findById(req.params.id, function(err, tvshow) {
	Report.find({"idReporte" : request.params.idReporte}, function(errno, report){
		if(errno)
			response.send(500, errno.message);

		console.log('GET /reports/idReporte');
		response.status(200).jsonp(report);
	});
}

exports.addReport = function(request, response){
	console.log(request.body);
	var newReport = new Report({
		userId				: request.body.userId,
		idReporte			: request.body.idReporte,
		edificio			: request.body.edificio,
		equipo				: request.body.equipo,
		numeroInventario	: request.body.numeroInventario,
		numUbicacion		: request.body.numUbicacion,
		descripcionProblema	: request.body.descripcionProblema,
		fecha				: request.body.fecha,
		estado				: request.body.estado,
		solucionProblema	: request.body.solucionProblema
	});

	newReport.save(function(errno, report){
		if (errno) 
			return response.status(500).send(errno.message);

		response.status(200).jsonp(report);
	});
}

exports.updateReport = function(req, res){
	//Report.findReportById({ "idReporte" : req.params.idReporte }, //NOTA: Esto no funciona NO SE RECONOCE LA FUNCION findReportById en tiempo de ejecucion dentro de este bloque
	Report.find({ "idReporte" : req.params.idReporte }, function(err, report){ //busco elemento a actualizar(mongoose guarda su _id)
		//report = report[0]; //el report  retornado por el find es un array de un único elemento, lo convertimos en un objeto
		report[0].edificio			= req.body.edificio;
		report[0].equipo			= req.body.equipo;
		report[0].numeroInventario	= req.body.numeroInventario;
		report[0].numUbicacion		= req.body.numUbicacion;
		report[0].descripcionProblema	= req.body.descripcionProblema;
		report[0].estado				= req.body.estado;
		report[0].solucionProblema	= req.body.solucionProblema;

		report[0].save(function(err){
			if(err)
				return res.status(500).send(err.message);
			console.log("PUT /reports/idReporte");
			res.status(200).send(report);
		})
	})
}

exports.deleteReport = function(req, res){
	//Report.findReportById({ "idReporte" : req.params.idReporte }, //NOTA: Esto no funciona NO SE RECONOCE LA FUNCION findReportById en tiempo de ejecucion dentro de este bloque
	Report.find({ "idReporte" : req.params.idReporte }, function(err, report){ //busco elemento a eliminar(mongoose guarda su _id)
		report[0].remove(function(err){ //Find regresa un array, debemos tomar el primer y único elemento que regreso ( en la posicion [0])
			if(err)
				return res.status(500).send(err.message);
			console.log('DELETE /reports/:idReporte');
			res.status(200).send();
		})
	})
}