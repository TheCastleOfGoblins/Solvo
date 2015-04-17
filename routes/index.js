var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var pos = require('pos');
	var words = new pos.Lexer().lex("The pos libary is working and it's fucking awesome.");
	var taggedWords = new pos.Tagger().tag(words);
	
	res.render('index', { title: 'Express', taggedWords:taggedWords });
});

module.exports = router;
