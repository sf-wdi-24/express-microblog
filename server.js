// SERVER.js

// APP REQUIREMENTS
var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var app = express();
var mongoose = require('mongoose');
var Post = require('./models/post');
var Comment = require('./models/comment');
mongoose.connect('mongodb://localhost/express-microblog');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
// Get - All Posts
app.get('/posts', function(req,res){
	res.render('posts');
});
// Get - Single Post
app.get('/posts/:id', function(req, res){
	var postId = req.params.id;
	Post.findOne({_id: postId})
		.populate('comments')
			.exec(function(err, singlePost){
				res.render('post', {post: singlePost});
			});
});
// Get - API - Single Post
app.get('/api/posts/:id', function(req, res){
	var postId = req.params.id;
	Post.findOne({_id: postId})
		.populate('comments')
				.exec(function(err, foundPost){
					res.json(foundPost);
				});
});
// Get - API - All Posts
app.get('/api/posts', function(req, res){
	Post.find()
		.populate('comments')
			.exec(function(err, allPosts){
				res.json(allPosts);
			});
});
// Post - API - Single Post
app.post('/api/posts', function(req, res){
	var newPost = new Post(req.body);
	newPost.save(function(err, savedPost){
		res.json(savedPost);
	});
});
// Update - API - Single Post
app.put('/api/posts/:id', function(req, res){
	var body = req.body;
	var postId = req.params.id;
	Post.findOne({_id: postId}, function(err, singlePost){
		singlePost.title = body.title;
		singlePost.body = body.body;
		singlePost.url = body.url;
		singlePost.favorite = body.favorite;
		singlePost.save(function(err, singleBook){
			res.json(singleBook);
		});
	});
});
// Delete - API - Single Book
app.delete('/api/posts/:id', function(req, res){
	var postId = req.params.id;
	Post.findOneAndRemove({_id: postId}, function(err, singlePost){
		res.json(singlePost);
	});
});
// Post - API - Single Comment
app.post('/api/posts/:id', function(req, res){
	var newComment = new Comment(req.body);
	var postId = req.params.id;
	newComment.save(function(err, savedComment){
		if(err) {return console.error(err);}
 		else console.log(savedComment);
	});
	Post.findOne({_id: postId}, function(err, singlePost){
		singlePost.comments.push(newComment);
		singlePost.save();
	});
	res.json(newComment);
});
// Get - API - All Comments for Single Post
app.get('/api/posts/:id/comments', function(req, res){
	var postId = req.params.id;
	Post.find({_id: postId})
		.populate('comments')
				.exec(function(err, foundPost){
					res.json(foundPost);
				});
});


// SERVER PORT
var server = app.listen(3000, function(){
	console.log("Server is running");
});