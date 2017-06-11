var mongoose = require('mongoose');
Schema  = mongoose.Schema;

var ServicioSoftwSchema = new Schema({
		userId : 			String,
		idSolicitud : 		{ type : String, unique : true},
		tipo			: String,
		//instalacion : Boolean,
		nombreSoftware : 	String,
		versionSoftware : 	String,
		numeroEquipos : 	Number,
		date : 				{ type:Date, default : Date.now},
		aula : 				String,
		materia : 			String,
		fechaFinal : 		{ type: Date, default: Date.now },
		comentarios : 		String,
		estado	: String,
		solucion : 	String
	},{
		collection : 'servicio_software'
	}
);

mongoose.model('ServicioSoftware', ServicioSoftwSchema); //IMportante exportarlo a modelo para que se pueda utilizar desde nuestro controlador