function openConnection (callback) {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/posts_test');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function (cb) {
		callback(db);
	});
}

module.exports.openConnection = openConnection;