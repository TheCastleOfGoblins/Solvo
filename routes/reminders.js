var reminderSearch = require('../helpers/reminderSearch');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	reminderSearch.getRemindersForDate( req.session.passport.user._id, Date.now(), function(err, result){
		res.json(result);
	})
});

module.exports = router;