var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');

/* GET home page. */
router.get('/', function(req, res, next) {
	var pos = require('pos');
	var words = new pos.Lexer().lex("The pos libary is working and it's fucking awesome.");
	var taggedWords = new pos.Tagger().tag(words);

	dbApi.openConnection(function(db){
		Post.find({}, function(err, posts){
			console.log(err, posts);
			res.render('index', { title: 'Express', posts:posts, taggedWords:taggedWords });
			db.close();
		});
	});	
});


router.post('/createDummyPost',function(req, res, next){

	var newRandomPost = new Post({title: req.body.test_param, content:Math.random().toFixed(5)});

	console.log(req.body, newRandomPost);
	
	dbApi.openConnection(function(db){
		newRandomPost.save(function(err, saved){
			res.redirect('/');
			db.close();
		});
	});
});

module.exports = router;
