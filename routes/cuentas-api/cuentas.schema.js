var mongoose = require('mongoose');
Schema  = mongoose.Schema;

var cuentasSchema = new Schema({
		cuentaServiceId		: {type:String},
		userId 				: {type: String},
		idSolicitud 		: {type : String, unique : true},
		serviceMode			: {type:String},	//serviceMode va a tomar el valor de la plataforma  
		status				: {type:String},
		fechaInit			: {type:String},
		actividad			: {type: String},
		descripcion			: {type: String},
		solucion 			: {type: String}
	},
	{ collection: 'servicesCuenta' }	
);

mongoose.model('cuentaService', cuentasSchema); //IMportante exportarlo a modelo para que se pueda utilizar desde nuestro controlador



