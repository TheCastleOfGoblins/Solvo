var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    facebookId: String,
    username : String,
    password : String,
    email    : String
});



module.exports = mongoose.model('User', userSchema);
