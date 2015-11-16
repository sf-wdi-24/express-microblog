var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var PostSchema = new Schema({
	post: String,
	name: String,
	time: Date,
	likes: Number,
	category: String
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;