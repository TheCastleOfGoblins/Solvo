var express = require('express');
var router = express.Router();

var Todo = require('../models/todo');
var dbApi = require('../helpers/dbApi');


router.get('/list', function(req, res, next) {
	dbApi.openConnection(function(db){
		Todo.find({ userId: req.session.passport.user._id, isResolved: false }, function(err, todos){
			res.json(todos);
			db.close();
		});
	});
});


router.post('/resolve', function(req, res, next) {
	dbApi.openConnection(function(db){
		Todo.update(
			{ _id: req.body.todoId, userId: req.session.passport.user._id },
			{ isResolved: true } ,
			function(err, numAffected){
				res.json(numAffected);
				db.close();
		});
	});
});


router.post('/insert', function(req, res, next) {
	
	if(['!','?','.'].indexOf(req.body.rawText[req.body.rawText.length - 1]) < 0){
		req.body.rawText +='.';
	}

	var newTodo = new Todo({
		rawText: req.body.rawText,
		userId: req.session.passport.user._id,
	});

	var analysis = require('../helpers/format.js');
	var posApi = require('../helpers/posApi');
	var model = posApi.syntaxAnalysis(newTodo.rawText);

	analysis.run(model , function(semantic){
		semantic.forEach(function(part){
			
			if(part[1] == 'DateTime'){
				var dateString = part[0].date.year + '-' + part[0].date.month + '-' + part[0].date.day + '-03:00';
				newTodo.reminderDates = [];
				
				newTodo.reminderDates.push(new Date(dateString));
			}
		});
		newTodo.syntaxAnalysis = semantic;

		dbApi.openConnection(function(db){
			newTodo.save(function(err, saved){
				res.json(saved);
				db.close();
			});
		});
	});
});


// for testing
router.get('/', function(req, res, next) {
	res.render('insertTodo', { title: 'Express' });
});
router.post('/location', function(req, res, next) {
	dbApi.openConnection(function(db){
		Todo.update(
			{ _id: req.body.todoId, userId: req.session.passport.user._id },
			{ location: [req.body.y, req.body.x] } ,
			function(err, numAffected){
				res.json(numAffected);
				db.close();
		});
	});
});



/*var posApi = require('../helpers/posApi');

router.get('/', function(req, res, next) {
	var model = posApi.syntaxAnalysis(req.body.rawText);
	format.run(model,function(model){
		model.request = req;
		model.location = {
      		lat : req.body.lat,
      		lon : req.body.lon
    	}
    	model.time = new Date();
    
    	actions.run(model,function(model){
    		res.json(model);
    	});
  	});
});*/
router.post('/runActions', function(req, res, next) {

	dbApi.openConnection(function(db){
		
		Todo.find({ _id: req.body.id }, function(err, todos){
			var actions = require('../helpers/actions');
			
			var model = todos[0].syntaxAnalysis;
			model.request = req;
			model.location = {
      			lat : req.body.lat,
      			lon : req.body.lon
    		};
    		model.time = new Date();
    		
    		actions.run(model, function(model){
    			
    			model.response.searches.wiki = model[model.length - 1].wiki;
    			model.response.searches.google = model[model.length - 1].google;
    			model.response.searches.bing = model[model.length - 1].bing;
    			model.response.raw = todos[0].rawText;
    			res.json(model.response);
    		});
	
			db.close();

		});
	});
});


module.exports = router;
