function act (model, callback, finalCallback) {
  model.response = {
    addresses : [],
    users : [],
    dateTimes : [],
    entities : [],
    searches : {},
    contactForm : false,
    raw : model.raw
  }
  callback(model);
}

module.exports.act = act;