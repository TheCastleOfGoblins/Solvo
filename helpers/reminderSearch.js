var dbApi = require('../helpers/dbApi');
var Todo = require("../models/todo");

function getRemindersForDate(userId, currentDate, callback){
	currentDate = new Date(currentDate);
	console.log(currentDate);
	var currentDateForReminder = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
	var latestDateForReminder = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1);
	
	var due_todos = [];
	dbApi.openConnection(function(db){
		var reminders = Todo.find({'_id':userId}, function(err, todos) {
		    todos.forEach(function(todo) {
		    	todo.reminderDates.forEach(function(date){
		    		if(date.getTime()>=currentDateForReminder.getTime() && 
		    		   date.getTime()<=latestDateForReminder.getTime()){
		    			due_todos.push(todo);
		    		}
		    	});
		    });
			db.close();
			console.log(due_todos);
			callback(null, due_todos);
		});
	});
}

module.exports.getRemindersForDate = getRemindersForDate;