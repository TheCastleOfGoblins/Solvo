var express = require('express');
var router = express.Router();

var User = require('../models/user');
var dbApi = require('../helpers/dbApi');

router.get('/', function(req, res, next) {
	return null;
});

module.exports = router;