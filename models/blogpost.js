var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment');

var BlogSchema = new Schema({
	title: String,
	content: String,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Blogpost = mongoose.model('Blog', BlogSchema);

module.exports = Blogpost;