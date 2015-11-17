var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		Comment = require('./comment');

var PostSchema = new Schema({
	post: String,
	name: String,
	time: Date,
	likes: {type: Number, default: 0},
	category: String,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;