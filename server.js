var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var hbs = require('hbs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressblog'); //database named expressblog

//require Post model
var Post = require('./models/post'); //collection name posts is always plural


app.use(express.static('public'));
hbs.registerPartials(__dirname + '/views/partials');
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

//updating post
app.put('/api/posts/:id', function(req, res) {
	var PostId = req.params.id;
	//find post in db by id
	Post.findOne({
		_id: PostId
	}, function(err, foundPost) {
		//updating posts attributes
		foundPost.title = req.body.title;
		foundPost.story = req.body.story;
		//saving updated post in db
		foundPost.save(function(err, savedPost) {
			res.json(savedPost);
		});
	});

});

//deleting post
app.delete('/api/posts/:id', function(req, res) {
	var PostId = req.params.id;
	Post.findOneAndRemove({
		_id: PostId
	}, function(err, deletedPost) {
		res.json(deletedPost);
	});
});

//IMBEDDING
//get comments

app.get('/api/posts/:id/comments', function(req, res) {
	//getting post id from URL params  
	var PostId = req.params.id;
	//finding post in db by id
	Post.findOne({
		_id: PostId
	}, function(err, foundPost) {
		res.json(foundPost);
	});

});







//ADDING IMBEDDED COMMENT ROUTE
app.post('/api/posts/:id/comments', function(req,res) {
	var PostId = req.params.id;
	Post.findOne({ _id: PostId}, function(err, foundPost) {
		//create new comment
		var newComment = new Comment(req.body);
		
		//saving comment adds it to the comments collection
		newComment.save();
		//give it to foundPost comments
		foundPost.comments.push(newComment);
		//save foundPost with new comment added
		foundPost.save();
		res.json(newComment);
	
 
        });
 });












var server = app.listen(process.env.PORT || 3000, function() {
	console.log("WASABII");
});