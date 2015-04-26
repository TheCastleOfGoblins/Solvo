var dbApi = require('../helpers/dbApi');
var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

router.get('/', function(req, res, next) {
  	dbApi.openConnection(function(db){
  		Contact.find({"_user":req.session.passport.user._id}, function(err,contacts){
  			res.json(contacts);
  			db.close();
  		});
	});
});


router.get('/list', function(req, res, next) {
  	dbApi.openConnection(function(db){
  		Contact.find({}, function(err, contacts){
  			res.json(contacts);
  			db.close();
  		});
	});
});


router.post('/create', function(req, res, next) {
  	dbApi.openConnection(function(db){
  		var params = {};
  		[
  			"facebookId",
    		"about",
    		"birthday",
    		"email",
    		"gender",
    		"name",
    		"first_name",
    		"middle_name",
    		"last_name",
    		"picture",
    		"link"
    		//, "_user"
    	].forEach(function(key) {
    		if(req.body.hasOwnProperty(key))
    		{
    			params[key] = req.body[key];
    		}
    	});
		
		var newUser = new Contact(params);
        newUser.save(function(err, saved){
        	res.json(saved);
	        db.close();
	    });
	});
});


router.get('/bulkLoad', function(req, res, next) {
	var contactsArray = require("./friends_emi.json").concat(require("./friends_hari.json"));
	dbApi.openConnection(function(db){
		contactsArray.forEach(function(elem) {

			elem.facebookId = elem.id;
			delete elem.id;
   				
			Contact.update({ facebookId: elem.facebookId }, elem, {upsert: true}, 
        function(err, res){ /*console.log(err, res);*/ }
      );

    });
		//db.close();
	}); 
});

module.exports = router;