var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');
var secrets = require('../secrets.json');
var User = require('../models/user');
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
	posApi.syntaxAnalysis("The pos libary is working and its fucking awesome.");
	console.log(req.session);

	var model = posApi.syntaxAnalysis("meet Jon at the intersection of Opulchenska and Slivnica .")
  console.log(model);
	
	var request = require('request');
	
	var defaultCaseApi = require('../helpers/defaultCase');
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
  
  formattingPipeline.format(model,[weekdayFormatter,baseTimeFormatter,dateFormatter,dateTimeFormatter,addressFormatter,atAddressFormatter],function(model){
    console.log('\n');
    console.log(model);
    console.log('finished model');
    res.render('index', { title: 'Express'/*,links:links , taggedWords:taggedWords */});
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
