var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title: String,
	content: String,
});

var Blogpost = mongoose.model('Blog', BlogSchema);

module.exports = Blogpost;