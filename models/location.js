var mongoose = require('mongoose');
var locationSchema = mongoose.Schema({
    name: String,
    _user: String,
    locations: [{
		coords: [Number]
    }]
});


locationSchema.index({ 'locations' : '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);
