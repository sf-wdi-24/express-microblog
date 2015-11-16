var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var PostSchema = new Schema({
	post: String,
	name: String,
	time: Date,
	likes: Number,
	categories: Array
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;