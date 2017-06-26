var mongoose = require('mongoose');

Schema = mongoose.Schema;

var  faqSchema = new Schema(
	
	{
		idfaq	: {type:String, unique:true},
		title	: String,
		content	: String
	},
	
	{ collection: 'faqs' }
);

mongoose.model('Faqs', faqSchema); 