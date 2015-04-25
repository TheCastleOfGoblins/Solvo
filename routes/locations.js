var dbApi = require('../helpers/dbApi');
var express = require('express');
var router = express.Router();
var Location = require('../models/location');

router.get('/', function(req, res, next) {
  	dbApi.openConnection(function(db){
  		Location.find({"_user":req.session.passport.user._id}, function(err,contacts){
  			res.json(contacts);
  			db.close();
  		});
	});
	console.log( req.session );
});

router.post('/create', function(req, res, next) {
  	dbApi.openConnection(function(db){
		var params = {
			'name':req.body.name,
		    'location':req.body.location,
		    '_user':req.session.passport.user._id
		};
		var newLocation = new Contact(params);
        newLocation.save(function(err, saved){
        	res.json(saved);
	        db.close();
	    });
	});
});

module.exports = router;