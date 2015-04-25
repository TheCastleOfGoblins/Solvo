var mongoose = require('mongoose');
var locationSchema = mongoose.Schema({
    name: String,
    _user: String,
    location: Array
});


locationSchema.index({ 'locations' : '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);
