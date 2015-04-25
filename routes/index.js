var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');
var secrets = require('../secrets.json');
var User = require('../models/user');
var search = require('../data/search');
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
  passport.use(new FacebookStrategy({
      clientID: secrets.facebook.appId,
      clientSecret: secrets.facebook.secret,
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile._json.id);
      dbApi.openConnection(function(db){
        User.findOne({ 'facebookId':profile._json.id }, function(err, existingUser){
          if(existingUser){
            console.log(existingUser);
            db.close();
            done(null, existingUser);
          }
          else{
            var newUser = new User({'facebookId':profile._json.id});
              newUser.save(function(err, saved){
                  db.close();
                   done(null, saved);
              });
          }
        });
    });
    }
  ));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
/* GET home page. */
router.get('/', function(req, res, next) {
	var posApi = require('../helpers/posApi');
	var wikiAPi = require('../helpers/wikiAPi');
	posApi.syntaxAnalysis("The pos libary is working and it's fucking awesome.");
	console.log(req.session);
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

		//var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

		// Using callback
		//geocoder.geocode('29 champs elysée paris', function(err, shat) {
        //console.log(shat);
	
	/*google('node.js best practices', function (err, next, links){
	  if (err) console.error(err)

		console.log(err,links[0],next);
		});*/
        //search.find("burger test",function(error, response, body){
          //console.log(body);
          res.render('index', { title: 'Express'/*,links:links*/ });
        //});
	//});
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' }));

module.exports = router;
