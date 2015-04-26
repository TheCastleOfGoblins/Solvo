function drawWeather(weather, locationName) {

	var weatherPanel = "<div class='weather-panel col-md-4'>"
		+ "<h3>Weather forecast for "+weather.dt+"</h3>"
		+ "<p>"+weather.weather.main+"</p>"
		+ "<span style=\"color:#aaaaff\">"+weather.avgTemp+" with</span>"
		+ "<span style=\"color:light-blue\">"+weather.weather.description+" is expected at "+locationName+"</span>"
		+ "<img class=\"weather-forecast-img\" src=\"http://openweathermap.org/img/w/"+weather.weather.pic+".png\" />"
		+ "</div>";
	return weatherPanel;
}


/*function drawTableTodos(todos) {
	var table = "<table>	<thead> <th>Task</th> <th>Options</th> </thead>";

	todos.forEach(function(todo){
		reminders += "<tr id='"+todo._id+"'> <td> <td>"
			+todo.rawText
			+"</td> <td>"
			+todo.
			<button class="help btn btn-sm" text="Help"></button>
			+"</td> <td>"
			+1
			+"</td> </tr>"
	});

	table += "</table>";
}*/

function drawReminders(todosWithActions) {
	var reminders = "<div class='reminders'>";
	
	todosWithActions.forEach(function(todo){

		var todoAction = "<p>Here put a map, or a weather report, or an upcoming date</p>"; //TODO

		reminders += "<div class='col-md-2' id='"+todo._id+"'>"
		+ "<h2>"+todo.rawText+"</h2>"
		+ todoAction
		+ "</div>";

	});

	reminders += "</div>";
}
