var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({
    name     : String,
    email    : String,
    phone    : String,
    // location : Array,
    _user    : { type: String, ref: 'User' }
});

module.exports = mongoose.model('Contact', contactSchema);
