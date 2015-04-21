var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');

/* GET home page. */
router.get('/', function(req, res, next) {

	var pos = require('pos');
	var words = new pos.Lexer().lex("The pos libary is working and it's fucking awesome.");
	var taggedWords = new pos.Tagger().tag(words);
	var google = require('google')

	google.resultsPerPage = 25
	var nextCounter = 0

	google('node.js best practices', function (err, next, links){
	  if (err) console.error(err)

		console.log(err,links[0],next);

		//geodecoder: 
		var geocoderProvider = 'google';
		var httpAdapter = 'https';
		// optionnal
		var secrets = require('../secrets.json')
		var extra = {
		    apiKey: secrets.google.server, // for Mapquest, OpenCage, Google Premier
		    formatter: null         // 'gpx', 'string', ...
		};

		var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

		// Using callback
		geocoder.geocode('29 champs elysée paris', function(err, res) {
		    console.log(res);
		});

		res.render('index', { title: 'Express',links:links, taggedWords:taggedWords });
	});
	
	
});




module.exports = router;
