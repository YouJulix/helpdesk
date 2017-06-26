//SCHEMA //Esquema de servicios para NovaDesk
var mongoose = require('mongoose');

Schema = mongoose.Schema;

var  servicioSchema = new Schema(
	
	{
		userId				: String,
		idServicio			: {type:String, unique:true},
		nombreServicio		: {type:String},
		versionSoftware		: {type:String},
		numeroEquipo		: {type:String},
		aula				: {type:String},
		materia				: {type:String},
		fechaLimite			: {type:String},
		comentarios			: {type:String},
		fecha				: {type:String},
		estado				: {type:String},
		solucionProblema	: {type:String}
	},
	
	{ collection: 'servicios' }
);
//Constrains
//reporteSchema.index({ userId: 1 }, { unique:false } , {unique:true}); 

mongoose.model('Servicios', servicioSchema); 