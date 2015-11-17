var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');
var Blogpost = require('./models/blogpost');
var Comment = require('./models/comment');


var app = express();


// Set up body-parser
app.use(bodyParser.urlencoded({ extended : true }));

// Set up static page directory
app.use(express.static(__dirname + '/public'));

// Set HBS view engine
app.set('view engine', 'hbs');

// Rendering index.hbs to homepage
app.get('/', function (req, res) {
	res.render('index');
});




// GET all blogposts with comments
app.get('/api/posts', function (req, res){
	Blogpost.find()
		.populate('comments')
			.exec(function (err, allBlogposts) {
				res.json({posts : allBlogposts});
			});
});

// GET one blogpost
app.get('/api/posts/:postId', function (req, res){
	var postId = req.params.postId;
	Blogpost.findOne({ _id: postId})
		.populate('comments')
			.exec(function (err, foundBlogpost)	{
				res.json(foundBlogpost);
	});
});

// POST new blogpost
app.post('/api/posts', function (req, res) {
	var newBlogpost = new Blogpost(req.body);
	newBlogpost.save(function (err, savedBlogpost) {
		res.json(savedBlogpost);
	});
});

// PUT (edit) blogpost
app.put('/api/posts/:postId', function (req, res){
	var postId = req.params.postId;
	Blogpost.findOne({_id: postId}, function (err, foundBlogpost){
		foundBlogpost.title = req.body.title;
		foundBlogpost.content = req.body.content;

		foundBlogpost.save(function (err, savedBlogpost){
			res.json(savedBlogpost);
		});
	});
});

// DELETE a blogpost
app.delete('/api/posts/:postId', function (req, res) {
	var postId = req.params.postId;
	Blogpost.findOneAndRemove({_id: postId}, function (err, deletedBlogpost) {
		res.json(deletedBlogpost);
	});
});


// POST new comment
app.post('/api/posts/:postId/comments', function (req, res) {
	var postId = req.params.postId;

	Blogpost.findOne({_id : postId}, function (err, foundBlogpost) {
		var newComment = new Comment(req.body);
	
		newComment.save(); 
		foundBlogpost.comments.push(newComment);
		foundBlogpost.save();
		res.json(foundBlogpost);
	});
});

// PUT (edit) comment
app.put('/api/posts/:postId/comment/:commentId', function (req, res){
	var postId = req.params.commentId;
	Blogpost.findOne({_id: postId}, function (err, foundBlogpost){
		foundBlogpost.title = req.body.title;
		foundBlogpost.content = req.body.content;

		foundBlogpost.save(function (err, savedBlogpost){
			res.json(savedBlogpost);
		});
	});
});

// DELETE a comment
app.delete('/api/posts/:id', function (req, res) {
	var postId = req.params.id;
	Blogpost.findOneAndRemove({_id: postId}, function (err, deletedBlogpost) {
		res.json(deletedBlogpost);
	});
});


// Server listening?
var server = app.listen(process.env.PORT || 3000, function(){
	console.log('HEY! LISTEN!');
});
