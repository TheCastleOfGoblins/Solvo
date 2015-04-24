var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    title: String, 
    content: String
});

postSchema.methods.showPost = function () {
  console.log(this.title + '\n' + this.content);
}


module.exports = mongoose.model('Post', postSchema);