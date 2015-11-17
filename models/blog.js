var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	Comment = require('./comments');

var BlogSchema = new Schema({
  place: String,
  description: String,
  image: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;