var dbApi = require('../helpers/dbApi');
var express = require('express');
var router = express.Router();
var Location = require('../models/location');

router.get('/', function(req, res, next) {
	res.render('insertLocation', { title: 'Express' });
});

router.post('/create', function(req, res, next) {
	var newLocation = new Location({
		name: req.body.name,
    location: [req.body.locx, req.body.locy]
	});
	dbApi.openConnection(function(db){
      newLocation.save(function(err, saved){
			res.json(saved);
			db.close();
		});
	});

});

module.exports = router;
