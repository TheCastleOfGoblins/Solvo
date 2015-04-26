var weatherApi = require('../weatherApi');

function act (model, callback, finalCallback) {
	var location = (model.response.addresses.length ? model.response.addresses[0] : model.location);
	var time = (model.response.dateTimes.length ? model.response.dateTimes[0] : model.time);
	weatherApi.getWeather(
		location, time,
		function(err, forecast) {
			model.response.weather = forecast;
			//console.log(model.response.weather.dt);
			callback(model);
		}
	);
}

module.exports.act = act;