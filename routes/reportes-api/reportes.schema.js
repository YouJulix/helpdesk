//SCHEMA //Esquema de reportes para NovaDesk
var mongoose = require('mongoose');

Schema = mongoose.Schema;

var  reporteSchema = new Schema(
	
	{
		userId				: String,
		idReporte			: {type:String, unique:true},
		edificio			: {type:String},
		equipo				: {type:String},
		numeroInventario	: {type:String},
		numUbicacion		: {type:String},
		descripcionProblema	: {type:String},
		fecha				: {type:String},
		estado				: { type : String },
		solucionProblema	: { type : String }
	},
	
	{ collection: 'reportes' }
);
//Constrains
//reporteSchema.index({ userId: 1 }, { unique:false } , {unique:true}); 

mongoose.model('Reportes', reporteSchema); 