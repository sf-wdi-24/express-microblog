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



//GET all quotes on pageload
app.get('/api/quotes', function (req, res){
	//EMBEDDING: don't need to call .populate()
	/*Quote.find(function (err, allQuotes){
		res.json(allQuotes);
	});*/

	//REFERNCING: call .populate() to bring in referenced comments
	Quote.find()
		.populate('comments')
			.exec(function (err, allQuotes){
				if (err) {
					res.json(err);
				} else {
					res.json(allQuotes);
				}
			});
}); /*closing get all request*/

//before comments
/*app.get('/api/quotes', function (req, res){
	//allQuotes is a taco...it's what is returned from the database.
	Quote.find(function (err, allQuotes) {
		res.json({quotes: allQuotes});
	});
});
*/


//GET one quote
app.get('/api/quotes/:id', function (req, res){
	//find quote id from url params
	var quoteId = req.params.id;

	//REFERENCING
	//find quote in db using quote id
	Quote.findOne({ _id: quoteId})
		.populate('comments')
			.exec(function (err, foundQuote){
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

//route to create NEW COMMENT associated to quote
app.post('/api/quotes/:quoteId/comments', function (req, res){
	//create new comment
	var quoteId = req.params.quoteId;

	//find quote in db using quote id
	Quote.findOne({ _id: quoteId }, function (err, foundQuote){
		//create new comment
		var newComment = new Comment(req.body);

		// SAVE new comment
	    // NOTE this is not required for embedding,
	    // but it is for referencing!
	    // saving the comment adds it to the comments collection
	    newComment.save();

	    //give it to foundQuotes.comments ('.push()')
	    foundQuote.comments.push(newComment);


	    //SECOND SAVE--save foundQuote WITH new comment added
	    foundQuote.save();

	    //respond with new comment
	    res.json(newComment);
	});
});

//POST new quote
app.post('/api/quotes', function (req, res) {
	var newQuote = new Quote(req.body);

	//save into db
	newQuote.save(function (err, savedQuote){
		if (err){
			res.status(500).json({error: err.message});
		} else {
			res.json(savedQuote);
		}
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

