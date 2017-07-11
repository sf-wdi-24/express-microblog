var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  commenttext: String,
  commentname: String,
  commenttime: Date,
  commentlikes: {type: Number, default: 0}
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;