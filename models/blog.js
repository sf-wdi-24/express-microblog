var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  place: String,
  description: String,
  image: String
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;