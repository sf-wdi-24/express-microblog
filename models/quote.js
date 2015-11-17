var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	Comment = require('./comment');

//Setting Schema
var QuoteSchema = new Schema({
	body: {
		category : String,
		statement: String,
		author: String,
		work: String
	},
	//EMBEDDING	
	/*comments: [comment.schema]*/

	//REFERENCING 
	comments: [{
		type: Schema.Types.ObjectId, 
		ref: 'Comment'
	}]
});

//Model 
var Quote = mongoose.model('Quote', QuoteSchema);

module.exports= Quote;