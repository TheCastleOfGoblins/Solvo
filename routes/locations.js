var dbApi = require('../helpers/dbApi');
var express = require('express');
var router = express.Router();
var Location = require('../models/location');

router.get('/', function(req, res, next) {
	res.render('insertLocation', { title: 'Add Location', pageTitle: 'Add Location' });
});

router.post('/create', function(req, res, next) {
	var newLocation = new Location({
		name: req.body.name,
    location: [req.body.locx, req.body.locy]
	});
	dbApi.openConnection(function(db){
      newLocation.save(function(err, saved){
			db.close();
      res.redirect('/');
		});
	});

});

router.get('/list', function(req, res, next) {
  	dbApi.openConnection(function(db){
  		Location.find({}, function(err, locations){
  			res.json(locations);
  			db.close();
  		});
	});
});

module.exports = router;
