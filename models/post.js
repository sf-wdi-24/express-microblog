var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	body: String,
	url: String,
	favorite: Boolean
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;