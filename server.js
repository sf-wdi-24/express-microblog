// require express and other modules
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// set up public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs
app.set('view engine', 'hbs');

// set up route for homepage
app.get('/', function(req, res) {
	res.render('index');
});


// start the server
app.listen(process.env.PORT || 5000, function() {
	console.log('listening');
});