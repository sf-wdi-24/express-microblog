var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  text: { type: String, default: "" },
  likes: {type: Number, default: 0}
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;