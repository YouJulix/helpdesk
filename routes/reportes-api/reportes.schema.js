//SCHEMA //Esquema de reportes para NovaDesk
var mongoose = require('mongoose');

Schema = mongoose.Schema;

var  reporteSchema = new Schema(
	
	{
		userId				: {type:String},
		idReporte			: {type:String},
		edificio			: {type:String},
		equipo				: {type:String},
		numeroInventario	: {type:String},
		numUbicacion		: {type:String},
		descripcionProblema	: {type:String},
		fecha				: {type:String}
	},
	
	{ collection: 'reportes' }
);
//Constrains
reporteSchema.index({ userId: 1 }, { unique:true } , {unique:true}); 

mongoose.model('Reportes', reporteSchema); 