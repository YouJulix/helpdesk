var mongoose = require('mongoose');
Schema  = mongoose.Schema;

var softwareSchema = new Schema({
		userId 				: String,
		softwareServiceId 	: {type : String, unique : true},
		serviceMode			: {type:String},	//serviceMode va a tomar el valor de tipo  
		status				: {type:String},	//Estado de la solicitud
		fechaInit			: {type:String},	//Fecha en la que se realizó la solicitud
		nombreSoftware 		: String,
		versionSoftware 	: String,
		numeroEquipos 		: Number,
		fechaFinal			: String,
		aula 				: String,
		materia 			: String,
		fechaDescarga		: String,
		comentarios 		: String,
		estado				: String,
		solucion 			: String
	},
	{ collection : 'servicesSoftware'}
);

mongoose.model('softwareService', softwareSchema); //IMportante exportarlo a modelo para que se pueda utilizar desde nuestro controlador

