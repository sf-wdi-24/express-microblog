var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Comment = require('./comment');

var PostSchema = new Schema({
	title: String,
	body: String,
	url: String,
	favorite: Boolean,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;