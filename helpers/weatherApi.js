var request = require('request');

function getWeather(coords, queryDate, callback) {
	queryDate = (new Date(queryDate.toDateString())).getTime();
	var today = (new Date((new Date()).toDateString())).getTime();
	var daysCnt = Math.ceil(
		(queryDate - today) / (1000*60*60*24)
	) + 1;

	request.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+coords.lat+"&lon="+coords.lon+"&cnt="+daysCnt+"&mode=json", function(err, response){
		if(err) {
			callback(err);
		}else {
			var body = JSON.parse(response.body);
			var data = body.list[body.list.length-1];
			var KELVIN_TO_CELSIUS = 273.15;

			callback(null, {
				dt: new Date(data.dt * 1000),
				avgTemp: data.temp.day - KELVIN_TO_CELSIUS,
				weather: {
					main: data.weather[0].main,
					description: data.weather[0].description
				},
				windSpeed: data.speed
			});
		}
	});
}

module.exports.getWeather = getWeather;
