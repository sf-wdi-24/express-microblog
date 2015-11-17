var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
	title: String,
	description: String,
	like: Boolean,
	time: String,
	category: String,
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;