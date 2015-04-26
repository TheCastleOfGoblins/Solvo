var weatherApi = require('../weatherApi');

function act (model, callback, finalCallback) {
  if(model.actionCandidates.indexOf('go') >= 0){
    var idx = model.actionCandidates.indexOf('go');
    if (idx > -1) {
      model.actionCandidates.splice(idx, 1);
    }
    model.response.subActions.push('go');
    var location = (model.response.addresses.length > 0 ? model.response.addresses[0] : model.location);
    var time;
    if(model.response.dateTimes.length > 0) {
      var dateTime = model.response.dateTimes[0];
      var d = dateTime.date;
      var t = dateTime.time;
      time = new Date(d.year,d.month - 1,d.day + 1,t.hour,t.minute);
    }
    else{
      time = model.time;
    }

    console.log(time);
    weatherApi.getWeather(
      location, time,
      function(err, forecast) {
        console.log(err);
        console.log(forecast);
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