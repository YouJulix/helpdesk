//API Routers
var express = require('express');

exports.addAPIRouter = function(app, ReportCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var reports = express.Router();
	
	reports.route('/reports')
		.get(ReportCtrl.findAllReports)
		.post(ReportCtrl.addReport);
		
	reports.route('/reports/:idReporte') 
		.get(ReportCtrl.findReportById)
		.put(ReportCtrl.updateReport)
		.delete(ReportCtrl.deleteReport);

	reports.route('/reports/user/:user') 
		.get(ReportCtrl.findReportsByUSer);

	//reports.route('/reports/:user/:')//Comente esto porque parece NO USADO  EDDY
	app.use("/api/v1.0", reports); //Usar en la ruta '/api/v1.0', las rutas/api definidas en el objeto  users
}

/*
			findAllReports Buscara en todos los reportes
			findReportsByUSer Buscara reportes dado un usuario en especifico
			addReport Agregara un reporte
*/
