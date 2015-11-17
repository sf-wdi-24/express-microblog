//Dependencies Declared
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

//configure body parser for form data
app.use(bodyParser.urlencoded({ extended : true }));

//public folder as static files
app.use(express.static(__dirname + '/public'));

//View engine to render hbs files
app.set('view engine', 'hbs');

//connect to mongodb
//THIS IS THE NAME OF THE DATABASE: QUOTE-APP. SO THIS IS WHAT'S USED WHEN USING MONGO
mongoose.connect('mongodb://localhost/quote-app');

//require Quote Model
var Quote = require('./models/quote');

//require Comment Model
var Comment = require('./models/comment');



//HOMEPAGE ROUTE
app.get('/', function (req, res){
	res.render('index');
});

//API ROUTES

//test data
/*var allQuotes = [
{	category: 'Book', 
	quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam! ',
	author: 'John Dwyer'},
{	category: 'movie',
	quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam!',
	author: "Cristina"}
];*/


//GET all quotes on pageload
app.get('/api/quotes', function (req, res){
	//EMBEDDING: don't need to call '.populate()'
	/*Quote.find(function (err, allQuotes) {
		if (err) {
			res.json (err);
		}	else {
			res.json(allQuotes);
		}
	});*/ //Closing embedding brace

	//REFERENCING: call '.populate()' to bring in
	Quote.find()
	 	.populate('comments')
	 	.exec(function (err, allQuotes) {
	 		if (err) {
			res.json (err);
		}	else {
			res.json(allQuotes);
		}
	 });
});//closing get request brace

//before comments
/*app.get('/api/quotes', function (req, res){
	//allQuotes is a taco...it's what is returned from the database.
	Quote.find(function (err, allQuotes) {
		res.json({quotes: allQuotes});
	});
});*/



//GET one quote
app.get('/api/quotes/:quoteId', function (req, res){
	//note: change in url params...now is :quoteId
	//find quote by id from url params
	var quoteId = req.params.quoteId;
	//EMBEDDING
	/*Quote.findOne(function( foundQuote){
		res.json(foundQuote);
	});*/
	
	//REFERENCING: call '.populate()' to bring in
	Quote.findOne({ _id: quoteId})
		.populate('comments')
		   .exec(function(err, foundQuote) {
		   		res.json(foundQuote);
		   });
});


//before comments
/*app.get('/api/quotes/:id', function (req, res){
	var quoteId = req.params.id;

	Quote.findById({_id: quoteId}, function (foundQuote) {
		res.json(foundQuote);
	});
});*/


//POST a new comment associated with a quote
app.post('/api/quote/:quoteId/comments', function (req, res){
	//find quote by id from url params
	var quoteId = req.params.quoteId;

	//find quote in db using quote id
	Quote.findOne({ _id: quoteId }, function(err, foundQuote){
		//create a new comment
		var newComment = new Comment(req.body);

		//SAVE new comment
		//NOT required for EMBEDDING, but it is FOR REFERENCING
		//saving the comment adds it to the comments collection
		newComment.save();

		//give it to foundQuote.comments('.push()')
		foundQuote.comments.push(newComment);

		//respond with new commeent
		res.json(newComment);
	});
});/*Closing brace for posting a comment associated with a quote*/



//POST new quote
app.post('/api/quotes', function (req, res) {
	var newQuote = new Quote(req.body);

	//save into db
	newQuote.save(function (savedQuote){
		res.json(savedQuote);
	});
});

//PUT update to quote
app.put('/api/quotes', function (req, res) {
	var quoteId = req.params.id;

	Quote.findById({_id: quoteId}, function (foundQuote){
		foundQuote.category=req.body.category;
		foundQuote.statement=req.body.statement;
		foundQuote.author=req.body.author;
		foundQuote.work=req.body.work;

		foundQuote.save(function(savedQuote){
			res.json(savedQuote);
		});
	});
});		

//DELETE quote
app.delete('/api/quotes', function (req, res) {
	var quoteId = req.params.id;

	Quote.findOneAndRemove({_id: quoteId}, function (deletedQuote){
		res.json(deletedQuote);
	});
});

//Start Server, localhost:3000.
app.listen(3000, function(){
	console.log("I'm listening");
});

