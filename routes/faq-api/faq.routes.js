var express = require('express');

exports.addAPIRouter = function(app, FaqCtrl){ //Siempre hay que utilizar el export cuando queremos registrar una funcion
	var faqs = express.Router();

	faqs.route('/faqs')
		.get(FaqCtrl.findAllFaqs)
		.post(FaqCtrl.addFaq)
		.put(FaqCtrl.updateFaq);

	faqs.route('/faqs/:id')
		.delete(FaqCtrl.deleteFaq);

	app.use("/api/v1.0", faqs);
}

//