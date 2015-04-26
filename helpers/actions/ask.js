function act(model, callback, finalCallback){
  if(model.actionCandidates.indexOf('ask') < 0){
    callback(model);
    return;
  }
  
  if(model.response.users.length == 0) {
    callback(model);
    return;
  }
  
  var idx = model.actionCandidates.indexOf('ask');
  
  if (idx > -1) {
    model.actionCandidates.splice(idx, 1);
  }
  
  model.response.contactForm = true;
  model.response.subActions.push("ask");
  model.response.loggedInUser = model.request.session.passport.user.username;
  callback(model);
  return;
}

module.exports.act = act;
