var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({
    facebookId	: { type: String, required: true },

    about		: String,
    birthday	: Date,
    email    	: String,
    gender		: { type: String, enum: ['M', 'F'] },

    name 		: String,
    first_name	: String,
    middle_name	: String,
    last_name	: String,

    picture		: Object,
    link		: String
});



module.exports = mongoose.model('Contact', contactSchema);
