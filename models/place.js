var mongoose = require('mongoose');
var placeSchema = mongoose.Schema({
    _id      : Number,
    name     : String,
    location : Array,
    _user    : { type: Number, ref: 'User' }
});

module.exports = mongoose.model('Place', placeSchema);
