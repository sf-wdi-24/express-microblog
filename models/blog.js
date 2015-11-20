var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment');

var BlogSchema = new Schema({
	title: {type: String},
	category: {type: String},
	blogContent: {type: String},
	likes: {type: Number},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Blog = mongoose.model('Blog', BlogSchema);

	module.exports = Blog;