function act (model, callback, finalCallback) {
  model.response = {
    addresses : [],
    users : [],
    dateTimes : [],
    entities : [],
    searches : {},
    weather: {},
    contactForm : false,
    raw : model.raw
  }
  callback(model);
}

module.exports.act = act;