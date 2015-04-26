var weatherApi = require('../weatherApi');

function act (model, callback, finalCallback) {
  if(model.actionCandidates.indexOf('go') >= 0){
    var idx = model.actionCandidates.indexOf('go');
    if (idx > -1) {
      model.actionCandidates.splice(idx, 1);
    }
    model.response.subActions.push('go');
    var location = (model.response.addresses.length ? model.response.addresses[0] : model.location);
    var time = (model.response.dateTimes.length ? model.response.dateTimes[0] : model.time);
    weatherApi.getWeather(
      location, time,
      function(err, forecast) {
        model.response.weather = forecast;
        callback(model);
      }
    );
  }
  else{
    callback(model);
  }
}

module.exports.act = act;