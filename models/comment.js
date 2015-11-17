var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CommentSchema = new Schema({
	body: {
		type: String,
		default: ""
	}
});	

var Comment = mongoose.model('Comment', CommentSchema);
//Exporting Comment Schema
module.exports = Comment;
