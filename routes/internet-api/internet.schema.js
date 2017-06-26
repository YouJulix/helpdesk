var mongoose = require('mongoose');

Schema = mongoose.Schema;

var internetSchema = new Schema(
	{
		internetServiceId	: {type:String},
		userId				: {type:String},
		serviceMode			: {type:String},  
		status				: {type:String},
		location			: {type:String},
		/*Si el tipo de servicio es externo serán llenados los sig campos*/
		mac					: {type:String},
		/*Si el tipo de servicio es interno llenar los siguientes datos*/
		fechafin			: {type:String},
		fechaInit			: {type:String},
		urls				: {type:String}		
	},

	{ collection: 'servicesInternet' }	
);

//internetSchema.index({ internetServiceId: 1 }, { unique:true } , {unique:true}); 

mongoose.model('internetService', internetSchema);