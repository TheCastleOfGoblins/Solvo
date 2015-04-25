var express = require('express');
var router = express.Router();

var Todo = require('../models/todo');
var dbApi = require('../helpers/dbApi');


router.get('/list', function(req, res, next) {
	dbApi.openConnection(function(db){
		console.log(req.body, req.query);
		Todo.find({ userId: req.body.userId, isResolved: false }, function(err, todos){
			//res.json(todos/*.map(function(todo){ return todo.showTodo(); })*/);
			//res.render('todo', { title: 'Express', todos: todos, userId: req.params.userId });
			res.json(todos);
			db.close();
		});
	});
});


/*router.get('/insert', function(req, res, next) {
	res.render('insertTodo', { title: 'Express', userId: req.query.userId });
	res.json();
});*/


router.post('/resolve', function(req, res, next) {
	dbApi.openConnection(function(db){
		Todo.update(
			{ _id: req.body.todoId, userId: req.body.userId }, 
			{ isResolved: true } , 
			function(err, numAffected){
				//res.redirect('/todos/list/' + req.body.userId);
				res.json(numAffected);
				db.close();
		});
	});
});


router.post('/insert'/*'/insertNewTodo'*/, function(req, res, next) {
	var newTodo = new Todo({
		rawText: req.body.rawText,
		userId: req.body.userId
	});
	dbApi.openConnection(function(db){
		newTodo.save(function(err, saved){
			//res.redirect('/todos/list/' + req.body.userId);
			res.json(saved);
			db.close();
		});
	});
});

module.exports = router;