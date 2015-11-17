var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Comment = require('./comment');

var BlogpostSchema = new Schema({
  body: {
    type: String,
    default: ""
  },
  // EMBEDDING
  comments: [Comment.schema]

  // // REFERENCING
  // comments: [{
  //   type: Schema.Types.ObjectId,
  //   // ref: 'Comment'
  // }]
});

var Blogpost = mongoose.model('Blogpost', BlogpostSchema);
module.exports = Blogpost;