//Dependencies Declared
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

//configure body parser for form data
app.use(bodyParser.urlencoded({ extended : true }));

//public folder as static files
app.use(express.static(__dirname + '/public'));

//View engine to render hbs files
app.set('view engine', 'hbs');

//HOMEPAGE ROUTE
app.get('/', function (req, res){
	res.render('index');
});

//API ROUTES

//test data
var allQuotes = [
{	category: 'Book', 
	quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam! ',
	author: 'John Dwyer'},
{	category: 'movie',
	quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam!',
	author: "Cristina"}
];



app.get('/api/quotes', function (req, res){
	res.json({quotesbars: allQuotes});
	console.log(allQuotes);
});





//Start Server, localhost:3000.
app.listen(3000, function(){
	console.log("I'm listening");
});

