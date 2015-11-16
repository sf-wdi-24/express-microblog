var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Setting Schema
var QuoteSchema = new Schema({
	category : String,
	statement: String,
	author: String,
	work: String
});

//Model 
var Quote = mongoose.model('Quote', QuoteSchema);

module.exports= Quote;