var dbApi = require('../helpers/dbApi');
var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

router.get('/', function(req, res, next) {
  	dbApi.openConnection(function(db){
  		Contact.find({"_user":req.body.user}, function(err,contacts){
  			res.json(contacts);
  			db.close();
  		});
	});
});

router.post('/create', function(req, res, next) {
  	dbApi.openConnection(function(db){
		var params = {'name':req.body.name, 'email':req.body.email, 'phone':req.body.phone, '_user':req.body._user};
		var newUser = new Contact(params);
        newUser.save(function(err, saved){
        	res.json(saved);
	        db.close();
	    });
	});
});



module.exports = router;