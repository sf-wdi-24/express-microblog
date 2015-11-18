//require express 
var express = require("express");
//require body parser
var bodyParser = require("body-parser");

var app = express();

//require mongoose
var mongoose = require("mongoose");

//connect the data base
mongoose.connect("mongodb://localhost/blog-posts-app");

//require schemas
var Post = require("./models/blogpost");
var Comment = require("./models/comment");
var User = require('./models/user');

//apply body parser package
app.use(bodyParser.urlencoded({extended:true}));

//connect public folder
app.use(express.static(__dirname + "/public"));

//log in settings
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//defind server and connect to local host 3000
var server = app.listen(process.env.PORT || 3000, function(){
	console.log("listening");
});

//defind view engine for handelbars
app.set("view engine", "hbs");

//signup page route
app.get('/signup', function (req, res) {
  res.render('signup');
});


//sign up post to the users db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/profile');
      });
    }
  );
});


//login page route
app.get("/login", function(req, res){
	res.render("login");
});

//login post route (confirm the user and post into the session)

app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/profile');
});
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/blog');
});

//route to the profie page
app.get('/profile', function (req, res) {
  res.render('profile', { user: req.user });
});

//route for the blog posts page
app.get("/blog", function(req,res){
	res.render("index");
});

//get all the blog posts from the db
app.get("/api/blog-posts", function(req, res){
	Post.find().populate("comments").exec(function(err, results){
		res.json({posts:results});
	});
});

//get one blog post with id
app.get("/api/blog-posts/:id", function(req, res){

	//post id to search
	var PostId = req.params.id;
	Post.findOne({_id: PostId}, function(err, result){
		console.log(result);
		res.json(result);
	});
});

//add new  blog post to the db
app.post("/api/blog-posts", function(req, res){
	console.log("req" + req);
	var newPost = new Post(req.body);

	//save the new post in the db
	newPost.save(function(err, savedPost){
		console.log(savedPost);
		res.json(savedPost);
	});
});

//delete a blog post from the db
app.delete("/api/blog-posts/:id", function(req, res){

	//post id to delete
	var postId = req.params.id;
	Post.findOneAndRemove({_id:postId}, function(err, deletedPost){
		console.log(deletedPost);
		res.json(deletedPost);
	});
});

//update a blog post

app.put("/api/blog-posts/:id", function(req, res){

	//post id to update
	var postId = req.params.id;
	Post.findOne({_id:postId}, function(err, postToUpdate){
		postToUpdate.topic = req.body.topic;
		postToUpdate.title = req.body.title;
		postToUpdate.content = req.body.content;
		postToUpdate.save(function(err, updatedPost){
		console.log(updatedPost);
		res.json(updatedPost);
		});
	});

});

//add comment and save in the db
app.post("/api/blog-posts/:id/comments", function(req,res){

	//post id to update
	var postId = req.params.id;
	console.log(req.body);

	Post.findOne({_id:postId}, function(err, foundPost){

		//new comment 
		var newComment = new Comment(req.body);

		console.log("comment:" + newComment);
		newComment.save();

		console.log(foundPost);
		foundPost.comments.push(newComment);
		foundPost.save();
		res.json(foundPost.comments);

	});
});

//delete a comment 
app.delete("/api/blog-posts/comments/:id", function(req,res){

	var commentId = req.params.id;
	Comment.findOneAndRemove({_id:commentId}, function(err, deletedComment){
		console.log(deletedComment);
		res.json(deletedComment);
	});
});

//get one comment
app.get("/api/blog-posts/comments/:id", function(req, res){

	//post id to search
	var commentId = req.params.id;
	Comment.findOne({_id: commentId}, function(err, result){
		console.log(result);
		res.json(result);
	});
});


//update a comment

app.put("/api/blog-posts/:id/comments/:id", function(req,res){

	var commentId = req.params.id;

	console.log(commentId + "text:" + req);
	Comment.findOne({_id:commentId}, function(err, CommentToUpdate){
		CommentToUpdate.text = req.body.text;
		CommentToUpdate.save(function(err, updatedComment){
			console.log(updatedComment);
			res.json(CommentToUpdate);
		});	
	});
});









