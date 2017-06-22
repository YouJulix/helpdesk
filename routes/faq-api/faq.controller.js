var mongoose = require('mongoose');
//CONTROLERS - FUNCIONES QUE EJECUTARÁN GET, PUT, DELETE...
var Faq = mongoose.model('Faqs');

//Find faqs
exports.findAllFaqs =  function(req, res){
	console.log('get/faqs');
	Faq.find(function(errno, faqs){
		if(errno)
			res.send(500, errno.message);
		res.status(200).jsonp(faqs);
	});
}
//add Faq
exports.addFaq = function(req,res){
	console.log('post/addfaq/' + req.body)
	var newFaq =  new Faq({idfaq : req.body.idfaq, title : req.body.title,content : req.body.content});
	newFaq.save(function(errno, faq){
		if (errno) 
			return res.status(500).send(errno.message);
		res.status(200).jsonp(faq);
	});
}
//Update faq
exports.updateFaq = function(req,res){
	console.log('put/faq/' + req.body)
	Faq.update(	{
					"idfaq" 		: req.body.idfaq
				},
				{	
					"title"		: req.body.title,
					"content"	: req.body.content		
				},
				function(erno, faq){
					if (erno) 
						return res.status(500).send(errno.message);
					res.status(200).jsonp(faq);
				}
		);
}
//delete faq
exports.deleteFaq = function(req, res){
	console.log('delete/faqs/'+req.params.id);
	Faq.find({ "idfaq" : req.params.id }, function(erno, faq){ //busco elemento a eliminar(mongoose guarda su _id)
		faq[0].remove(function(err){ //Find regresa un array, debemos tomar el primer y único elemento que regreso ( en la posicion [0])
			if(err)
				return res.status(500).send(err.message);
			res.status(200).send();
		})
	})
}