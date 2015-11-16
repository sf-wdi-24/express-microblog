var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	topic: String,
	title: String,
	content: String,
	likes: Number
});

var Post = mongoose.model ("Post", PostSchema);
module.exports = Post;

