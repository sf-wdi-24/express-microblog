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

app.post('/api/posts', function(req, res) {
	// use form data to create new post
	var newPost = new Post(req.body);

	// save new post in the database
	newPost.save(function(err, savedPost) {
		res.json(savedPost);
	});
});

app.get('/api/posts/:id', function(req, res) {
	// find url from parameters
	var postId = req.params.id;

	// find post in db using id
	Post.findOne({ _id: postId }, function(err, foundPost) {
		res.json(foundPost);
	});
});

app.put('/api/posts/:id', function(req, res) {
	// find url from parameters
	var postId = req.params.id;

	// find post in db using id
	Post.findOne({ _id: postId }, function(err, foundPost) {
		// Update the posts's attributes
		foundPost.post = req.body.post;
		foundPost.name = req.body.name;
		foundPost.time = req.body.time;
		foundPost.likes = req.body.likes;
		foundPost.category = req.body.category;

		// Save updated todo
		foundPost.save(function(err, savedPost) {
			res.json(savedPost);
		});
	});
});

app.delete('/api/posts/:id', function(req, res) {
	// find url from parameters
	var postId = req.params.id;

	// find post in db using id
	Post.findOneAndRemove({ _id: postId }, function(err, deletedPost) {
		res.json(deletedPost);
	});
});

// start the server
app.listen(process.env.PORT || 5000, function() {
	console.log('listening');
});