// require express and other modules
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

// set up public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs
app.set('view engine', 'hbs');

// set up route for homepage
app.get('/', function(req, res) {
	res.render('index');
});

// connect to mongodb
mongoose.connect('mongodb://localhost/posts-app');

// require Post model
var Post = require('./models/post');

// set up api routes
app.get('/api/posts', function(req, res) {
	Post.find(function(err, allPosts) {
		res.json({ posts: allPosts });
	});

});

// start the server
app.listen(process.env.PORT || 5000, function() {
	console.log('listening');
});