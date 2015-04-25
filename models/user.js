var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    facebookId: String,
    username : String,
    email    : String
});



module.exports = mongoose.model('User', userSchema);
