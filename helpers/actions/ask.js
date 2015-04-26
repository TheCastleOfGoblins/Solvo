function action(model, callback, finalCallback){
	model.response.contactForm = true;
  	model.response.loggedInUser = model.request.session.passport.user.username



  	return questionTemplate(from, to, question);
}

module.exports.action = action;
