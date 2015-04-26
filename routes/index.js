var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');
var secrets = require('../secrets.json');
var overpassApi = require('../helpers/overpassApi');
var User = require('../models/user');
var accessTokenModel = require('../models/accessToken');
var search = require('../data/search');

var formattingPipeline = require('../helpers/formattingPipeline');
var regexAddressFormatter = require("../helpers/formatters/regexAddress");
var relativeAddressFormatter = require("../helpers/formatters/relativeAddress");
var baseTimeFormatter = require("../helpers/formatters/baseTimeFormater");
var weekdayFormatter = require("../helpers/formatters/weekdayFormatter");
var dateFormatter = require("../helpers/formatters/dateFormatter");
var dateTimeFormatter = require("../helpers/formatters/dateTimeFormatter");
var addressFormatter = require("../helpers/formatters/addressFormatter");
var atAddressFormatter = require("../helpers/formatters/atAddressFormatter");

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
  passport.use(new FacebookStrategy({
      clientID: secrets.facebook.appId,
      clientSecret: secrets.facebook.secret,
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      dbApi.openConnection(function(db){

        User.findOne({ 'facebookId':profile._json.id }, function(err, existingUser){
          if(existingUser){
          	var newToken = new accessTokenModel({'userId':existingUser.id, 'token':accessToken})
          	accessTokenModel.remove({'userId':existingUser.id},function(){
          		newToken.save(function(err, saved){
			        db.close();
			        done(null, existingUser);
          		});
          	});

          }
          else{
            var newUser = new User({'facebookId':profile._json.id, 'name': profile._json.name});
              newUser.save(function(err, saved){
              	var newToken = new accessTokenModel({'userId':existingUser.id, 'token':accessToken})
          		accessTokenModel.remove({'userId':existingUser.id},function(){
          			newToken.save(function(err, saved){
		              db.close();
		              done(null, saved);
              		});
          		});

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


router.get('/overpass', function(req, res, next) {
	overpassApi.overpassApi('node(50.745,7.17,50.75,7.18);out;', function(error, data) {
		if(error) {
			console.log(error.message);
		} else {
			console.log(data);
		}
	});
});


/* GET home page. */
router.get('/', function(req, res, next) {
	// var graph = require('fbgraph');
	// if(req.session.passport.user){
	// 	dbApi.openConnection(function(db){
	// 		accessTokenModel.find({'userId':req.session.passport.user._id} , function(err, accessToken){
	// 			 graph.setAccessToken('CAAFPA7Fpf1ABAFlzcF6nIo7olV7SUp95oG3ZAPnFU2QN5bZBRFtoNZAZBWq1NFfwW8AFGj7Vt7z8ySlsqam8sidgZBNAIt1cxoKXX0TowS3a44AUdCbYOZBzGIpK47jBGhuNWginO7efSwMIBzgTK4a54WJF3t8VpBZAkFXDbCuSD0ZAp6o8EhMgQkMnNCFiZBnDRazCVBxQ8ice9TkbKYC6uwJfcfU2vMkP3EGmK7058xQZDZD');
	// 			 // console.log(graph);
	// 			 graph.get("/me/taggable_friends", function(err, res) {
	// 			 	console.log(err, res);
	// 			 });

	// 		});
	// 	})
	// }
	var posApi = require('../helpers/posApi');

	var wikiAPi = require('../helpers/wikiAPi');
	posApi.syntaxAnalysis("The pos libary is working and its fucking awesome.");



	var model = posApi.syntaxAnalysis("drive Jon from Svoge Iskarski Prolom 5 to Opulchenska.")

  	console.log(model);

	var request = require('request');

	// var defaultCaseApi = require('../helpers/defaultCase');
	var posApi = require('../helpers/posApi');
	var posedString = posApi.syntaxAnalysis('find big stupid dogs');
	// defaultCaseApi.defaultSearch(posedString, function(err, info){
	// 	console.log(info);
	// });
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
        //});
	//});

  var contactFormater = require('../helpers/formatters/contactFormater');
  var searchFormatter = require('../helpers/formatters/searchFormatter');
  
  formattingPipeline.format(model,[weekdayFormatter,baseTimeFormatter,dateFormatter,dateTimeFormatter,addressFormatter,atAddressFormatter, contactFormater, searchFormatter],function(model){
    console.log('\n');
    console.log(model);
    console.log('finished model');
   	
   
  	res.render('index', { title: 'Express'});
  });
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' }));


router.get('/weather', function(req, res, next) {
  require('../helpers/weatherApi').getWeather(
    { lat: req.query.lat, lon: req.query.lon }, req.query.dt,
    function(err, forecast) {
      res.json(forecast);
    });
});

module.exports = router;
 