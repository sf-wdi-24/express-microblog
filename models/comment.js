var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({
	body: String,
	upvote: Number,
	downvote: Number
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;