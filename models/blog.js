var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	title: {type: String},
	category: {type: String},
	blogContent: {type: String},
	comments: {type: String}
});

var Blog = mongoose.model('Blog', blogSchema);

	module.exports = Blog;