var mongoose = require('mongoose');
var accessTokenSchema = mongoose.Schema({
	token: {type:String, required:true},
	userId: {
    	type: String,
    	required: true
    }
});

module.exports = mongoose.model('accessToken', accessTokenSchema);