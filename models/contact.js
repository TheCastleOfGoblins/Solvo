var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({
    _id      : Number,
    name     : String,
    email    : String,
    phone    : String,
    location : Array,
    _user    : { type: Number, ref: 'User' }
});

module.exports = mongoose.model('Contact', contactSchema);
