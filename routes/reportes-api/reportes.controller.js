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
		fecha				: request.body.fecha
	});

	newReport.save(function(errno, report){
		if (errno) 
			return response.status(500).send(errno.message);

		response.status(200).jsonp(report);
	});
}