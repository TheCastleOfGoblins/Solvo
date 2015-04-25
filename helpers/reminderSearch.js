var Todo = require("../models/todo");

function getRemindersForDate(currentDate){
	var currentDateForReminder = new Date(currentDate.year, currentDate.month+1, currentDate.day);
	var latestDateForReminder = new Date(currentDate.year, currentDate.month+1, currentDate.day+1);
	var reminders = Todo.where({}, function(err, todos) {
	    var todos = [];

	    todos.forEach(function(todo) {
	    	todo.reminderDates.forEach(function(date){
	    		if(date.getTime()>=currentDateForReminder.getTime() && 
	    		   date.getTime()<=latestDateForReminder.getTime()){
	    			todo.push(todo);
	    		}
	    	});
	    });
	    res.send(todos);  
	 });
}
