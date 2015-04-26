var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var dbApi = require('../helpers/dbApi');
var secrets = require('../secrets.json');
var overpassApi = require('../helpers/overpassApi');
var User = require('../models/user');
var accessTokenModel = require('../models/accessToken');
var search = require('../data/search');

var format = require('../helpers/format');
var actions = require('../helpers/actions');
var entityMapper = require("../helpers/entityMapper");

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

  if(!req.session.passport.user){
    res.redirect('/auth/facebook/');
    return;
  }
	var posApi = require('../helpers/posApi');

	var wikiAPi = require('../helpers/wikiAPi');

	var model = posApi.syntaxAnalysis("buy shoes at 11/11/2020")

  format.run(model,function(model){
    model.request = req;
    model.location = {
      lat : 42.6930319,
      lon : 23.3206504
    }
    model.time = new Date();
    
    var Todo = require('../models/todo');
    actions.run(model,function(model){
      console.log(model);
      dbApi.openConnection(function(db){
        Todo.find({"userId":req.session.passport.user._id}).limit(5).exec(function(err,todos){
          
          var templateParameters = {
            'title':"Solvo Homepage",
            'pageTitle':"Home",
            'username':req.session.passport.user.username,
            'todos':todos
          }
          db.close();
          res.render('index', templateParameters);
        });
      });
    });
  });
    /*openStreetMapsApi.find("amenity","bar",42.6930319,23.3206504,function(err,data){
      // console.log(data.body);
      
    });*/
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
 
