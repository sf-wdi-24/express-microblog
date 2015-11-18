var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Comment = require("./comment");

var PostSchema = new Schema({
	topic: String,
	title: String,
	content: String,
	comments: [{type: Schema.Types.ObjectId,ref:"Comment"}],
	likes: Number
});

var Post = mongoose.model ("Post", PostSchema);
module.exports = Post;

