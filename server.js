//Require the following libraries
var express = require('express');
var hbs = require('hbs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// require models
var Blog = require('./models/blog');
var Comment = require('./models/comment');
var User = require('./models/user');

//connect mongo database to project
mongoose.connect('mongodb://localhost/blogs_app');

var app = express();

//tell express to use passport
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

//tell express to use public dir for css and js
app.use(express.static(__dirname + '/public'));

//enable body-parser to gather data
app.use(bodyParser.urlencoded({extended: true}));

//allow express to render hbs pages for client
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');

//client home page
app.get('/', function (req,res) {
	res.render('index',{ user: req.user });
});

//gather blogs data from server
app.get('/api/blogs', function (req,res) {
	Blog.find().populate('comments').populate('postedBy').exec(function (err , allBlogs) {
		res.json({blogs: allBlogs});
	});
});

// find specific blog from server using id
app.get('/api/blogs/:id', function (req,res) {
	var blogId = req.params.id;
	Blog.findOne({_id: blogId}, function (err, findBlog) {
		res.json(findBlog);
	});
});

//create new blog posting
app.post('/api/blogs', function (req, res) {
	if (req.user) {
		var newBlog = new Blog(req.body, req.user);
		newBlog.save(function(err, savedBlog){
			if(err) {
				res.status(500).json({error: err.message});
			}
			else {
				req.user.posts.push(savedBlog);
				req.user.save();
				res.json(savedBlog);	
			}
		});	
	}
	else {
		res.status(401).json({error: 'Unauthorized'});
	}
	
});

//delete existing blog post
app.delete('/api/blogs/:id', function (req,res) {
	var blogId = (req.params.id);
	Blog.findOneAndRemove({_id: blogId}, function (err, deletedBlog) {
		res.json(deletedBlog);
	});
}) ;

//edit existing blog post
app.put('/api/blogs/:id', function (req,res) {
	var blogId = req.params.id;
	Blog.findOne({_id: blogId}, function (err,updatedBlog) {
		updatedBlog.title = req.body.title;
		updatedBlog.category = req.body.category;
		updatedBlog.blogContent = req.body.blogContent;
		// updatedBlog.comments = req.body.comments;
		updatedBlog.save(function (err, newUpdatedBlog) {
			res.json(newUpdatedBlog);
		});
	});
});

// //show comments route
// app.get('/api/blogs/:id/comments', function(req,res){
// 	var blogId = req.params.id;
// 	Blog.findOne({_id: blogID}).populate('comments').exec(function(err, foundComment){
// 		res.json(foundComment);
// 	});
// });

//add new comments
app.post('/api/blogs/:id/comments/', function (req,res){
	var blogId = req.params.id;
	Blog.findOne({_id: blogId}, function(err, foundBlog){
		var newComment = new Comment (req.body, req.user);
		newComment.commentedBy = req.user;
		newComment.save();
		foundBlog.comments.push(newComment);
		foundBlog.save();
		res.json(newComment);
	});
});

//update individual comment not working :(
// app.put('/api/blogs/:id/comments/:comment-id', function(req,res){
// 	var blogId = req.params.id;
// 	var commentId = req.params.comment-id;
// 	Comment.findOne({_id : comment-id}, function(err, foundComment){
// 		updatedComment.text = req.body.text;
// 		updatedComment.save();
// 		res.send(err);
// 		res.json(updatedComment);
// 	});
// });

//delete comment
app.delete("/api/blogs/:blogId/comments/:commentId", function (req, res) {
	var commentId = req.params.commentId;
		Comment.findOneAndRemove({ _id: commentId}, function (err, deleteComment) {
			res.json(deleteComment);
		});
});

//signin GET route for new users
app.get('/signup', function (req,res) {
	if (req.user){
		res.redirect('/profile');
	}
	else {
		res.render('signup', {user: req.user});
	}
});

//sign up a new user and log them in
app.post('/signup', function (req,res) {

	//if user is logged in dont let them sign up again
	if (req.user){
		res.redirect('/profile');
	}
	else {
		User.register(new User({ username: req.body.username}), req.body.password, 
			function (err, newUser) { 
			passport.authenticate('local')(req,res, function(){
				res.redirect('/profile');
			});
		});
	}
});

//show login page for an existing user
app.get('/login', function (req,res) {
	if (req.user){
		res.redirect('/profile');
	}
	else {
		res.render('login', {user: req.user});
	}
});

//post route for login user
app.post('/login', passport.authenticate('local', 
	{ successRedirect: '/profile',
		failureRedirect: '/hackers'}),
		 function (req,res) {
	res.redirect('/profile');
});

//unseccessful login
app.get('/hackers', function (req,res) {
	res.render('hackers');
});

//log out user
app.get('/logout', function (req,res) {
	req.logout();
	res.redirect('/');
});

//user profile page
app.get('/profile', function (req,res) {
	if (req.user) {
		res.render('profile', { user: req.user });
	}
	else {
		res.redirect('/login');
	}
});

//set express to use localport
app.listen(3000, function(){
	console.log('ready to serve');
});