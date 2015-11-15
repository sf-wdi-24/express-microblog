var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var hbs = require('hbs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressblog'); //database named expressblog

//require Post model
var Post = require('./models/post'); //collection name posts is always plural


app.use(express.static('public'));
app.set('view engine', 'hbs');

//configuring for bodyparser
app.use(bodyParser.urlencoded({
	extended: true
}));



//STATIC ROUTE
app.get('/', function(req, res) {
	res.render('index');
});

//GET ALL POSTS
app.get('/api/posts', function(req, res) {
	console.log("hello");
	// find all posts in db
	Post.find(function(err, allPosts) {
		res.json({
			posts: allPosts
		});

	});
});

//GETTING ONE POST
app.get('/api/posts/:id', function(req, res) {
	//getting post id from URL params  
	var postId = req.params.id;
	//finding post in db by id
	Post.findOne({
		_id: postId
	}, function(err, foundPost) {
		res.json(foundPost);
	});

});


//POSTING A STORY
app.post('/api/posts', function(req, res) {
	var newPost = new Post(req.body);

	// save new todo in db
	newPost.save(function(err, savedPost) {
		res.json(savedPost);
	});
});

//updating todo
app.put('/api/posts/:id', function(req, res) {
	var PostId = req.params.id;
	//find post in db by id
	Post.findOne({ _id: PostId }, function(err, foundPost) {
      //updating posts attributes
      foundPost.title = req.body.title;
      foundPost.story = req.body.story;
      //saving updated post in db
      foundPost.save(function(err, savedPost) {
      	res.json(savedPost);
      });
	});

});



var server = app.listen(process.env.PORT || 3000, function() {
	console.log("WASABII");
});