var mongoose = require('mongoose');
var todoSchema = mongoose.Schema({
    rawText: {
    	type: String,
    	required: true
    },
    isResolved: {
    	type: Boolean,
    	required: true,
    	default: false
    },
    createdAt: {
    	type: Date,
    	default: Date.now
    },
    reminderDates: [Date],
    userId: {
    	type: String,
    	required: true
    },
    syntaxAnalysis: Object,
    location: Array
    // locations: [{ /*type: "Point",*/ coords: [Number] }]
});


//todoSchema.index({ 'locations' : '2dsphere' });

todoSchema.methods.showTodo = function () {
	return this.rawText + '\n'
		+ this.isResolved + '\n'
  		+ this.createdAt + '\n'
  		+ this.userId + '\n';
}


module.exports = mongoose.model('Todo', todoSchema);
