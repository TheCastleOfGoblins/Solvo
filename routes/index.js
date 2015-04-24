var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');
var secrets = require('../secrets.json');
var User = require('../models/user');

var passport = require('passport')
	, FacebookStrategy = require('passport-facebook').Strategy;
		console.log('LOgin');
	passport.use(new FacebookStrategy({
	    clientID: secrets.facebook.appId,
	    clientSecret: secrets.facebook.secret,
	    callbackURL: "http://localhost:3000/auth/facebook/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	    //User.findOrCreate(..., function(err, user) {
	    //  if (err) { return done(err); }
	    //  done(null, user);
	    //});
		console.log(accessToken, refreshToken, profile);
	  }
	));

/* GET home page. */
router.get('/', function(req, res, next) {
	var posApi = require('../helpers/posApi');
	posApi.syntaxAnalysis("The pos libary is working and it's fucking awesome.")

	var request = require('request');
	//var google = require('google')

	//google.resultsPerPage = 25
	var nextCounter = 0
  
  //geodecoder: 
  var geocoderProvider = 'google';
  var httpAdapter = 'https';
  // optionnal
  
  var extra = {
      formatter: null         // 'gpx', 'string', ...
  };

		var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

		// Using callback
		geocoder.geocode('29 champs elysée paris', function(err, shat) {
        console.log(shat);
	
	/*google('node.js best practices', function (err, next, links){
	  if (err) console.error(err)

		console.log(err,links[0],next);
		});*/

        res.render('index', { title: 'Express'/*,links:links*/ , taggedWords:taggedWords });
    
	});
});
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/posts' }));

module.exports = router;
