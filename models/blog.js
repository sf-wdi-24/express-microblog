var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BlogSchema = new Schema({
  task: String,
  description: String,
  image: image
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;