var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var blogPostSchema = new Schema({
  title: String,
  description: String
});

var blogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = blogPost;