function action(model, callback, finalCallback){
  //var from = get username (from session)
  //var question = get the question (from model - remove the verb and the contact)
  //var to = get the contact (from model)

  return questionTemplate(from, to, question);
}

function questionTemplate(from, to, question) {
  return {
    greeting: "Dear {0}, ".format(from),
    body: "I wanted to ask you {0}".format(question),
    end: "Best wishes, {0}".format(to)
  };
}

module.exports.action = action;
