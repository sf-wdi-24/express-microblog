var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    Comment = require('./comment'); //requring comments schema

var PostSchema = new Schema({
 	title: String,
    story: String,


    comments: [Comment.schema] //requiring comments schema
   // [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;//allows us to use this in server.js
                  //this is for errors like 'schema is undefined'