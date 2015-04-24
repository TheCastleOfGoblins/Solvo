var express = require('express');
var router = express.Router();

var Todo = require('../models/todo');
var dbApi = require('../helpers/dbApi');


router.get('/list/:userId', function(req, res, next) {
	res.json({ user: req.params.userId, a: req.query.a });
});


router.get('/insert', function(req, res, next) {
	res.render('insertTodo', { title: 'Express', userId: req.query.userId });
});


router.post('/resolve', function(req, res, next) {
	dbApi.openConnection(function(db){
		Todo.update(
			{ _id: req.body.todoId, userId: req.body.userId }, 
			{ isResolved: true } , 
			function(err, saved){
				res.redirect('/todos/list/' + req.body.userId);
				db.close();
		});
	});
});


router.post('/insertNewTodo', function(req, res, next) {
	var newTodo = new Todo({
		rawText: req.body.rawText,
		userId: req.body.userId
	});
	dbApi.openConnection(function(db){
		newTodo.save(function(err, saved){
			res.redirect('/todos/list/' + req.body.userId);
			db.close();
		});
	});
});

module.exports = router;