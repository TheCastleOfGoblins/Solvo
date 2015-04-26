var weatherApi = require('../weatherApi');

function act (model, callback, finalCallback) {
	weatherApi.getWeather(
		model.location, model.time,
		function(err, forecast) {
			model.response.weather = forecast;
			console.log(model.response.weather.dt);
			callback(model);
		}
	);
}

module.exports.act = act;