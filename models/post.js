var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  Blog: String,
  
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;