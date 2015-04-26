function act (model, callback, finalCallback){
	model.response.contactForm = true;
  	model.response.loggedInUser = 1;//req.session.passport_id;
  	console.log(model.response);

  	//return questionTemplate(from, to, question);
}

module.exports.act = act;
