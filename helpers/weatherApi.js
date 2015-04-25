var request = require('request');

function getWeather(coords, queryDate, callback) {
	var daysCnt = Math.ceil(
		(queryDate/*.getTime()*/ - Date.now()) / (1000*60*60*24)
	) + 1;
	// Example: queryDate = (new Date("Sat Apr 25 2015")).getTime();

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
