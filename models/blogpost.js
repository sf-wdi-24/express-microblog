var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BlogpostSchema = new Schema({
	title: String,
	story: String
});

var Blogpost = mongoose.model('Blogpost', BlogpostSchema);
module.exports = Blogpost;