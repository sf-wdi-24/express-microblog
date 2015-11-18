//require express and needed modules
var express = require("express"),
	hbs = require("hbs"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	cookieParser = require("cookie-parser"),
	session = require("express-session"),
	passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy;

var	app = express();

var Post = require("./models/post");
var Comment = require("./models/comment");
var User = require('./models/user');


mongoose.connect("mongodb://localhost/microbog-app");

app.use(bodyParser.urlencoded({extended: true}));
// middleware for auth
app.use(cookieParser());
app.use(session({
	secret: 'supersecretkey',
	resave: false,
saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.set("view engine", "hbs");
app.use(express.static("public"));



app.get("/", function (req, res) {
	res.render("index");
});

//set up posts api
app.get("/api/posts", function (req, res) {
	// Post.find(function (err, allPosts) {
	// 	res.json({posts: allPosts});
	// });
	Post.find()
		.populate("comments")
			.exec(function (err, allPosts) {
				res.json({posts: allPosts});
			});
});

//create new post
app.post("/api/posts", function (req, res) {
	//create new post from form data
	var newPost = new Post(req.body);
	newPost.like = false;
	newPost.time = (new Date()).toDateString();
	//save newPost in db
	newPost.save(function (err, newPost) {
		res.json(newPost);
	});
});

//find specific post by its id

app.get("/api/posts/:id", function (req, res) {
	//get id from url
	var id = req.params.id;
	//find the post with specific id in db
	Post.findOne({ _id: id}, function (err, foundPost) {
		res.json(foundPost);
	});
});

app.put("/api/posts/:id", function (req, res) {
	// get id
	var id = req.params.id;
	// find post by id
	Post.findOne({ _id: id}, function (err, foundPost) {
		//assign new value to foundPost
		foundPost.title = req.body.title;
		foundPost.description = req.body.description;
		foundPost.like = req.body.like;
		foundPost.time = req.body.time;
		foundPost.category = req.body.category;
		//save edited foundPost to db
		foundPost.save(function (err, editedPost) {
			res.json(editedPost);
		});
	});
});

app.delete("/api/posts/:id", function (req, res) {
	//get id
	var id = req.params.id;
	//remove the post with that id
	Post.findOneAndRemove({ _id: id}, function (err, deletedPost) {
		res.json(deletedPost);
	});
});

//route to create new comment 
app.post("/api/posts/:postId/comments", function (req, res) {
	var postId = req.params.postId;

	Post.findOne({ _id: postId}, function (err, foundPost) {
		var newComment = new Comment(req.body);

		newComment.save();
		foundPost.comments.push(newComment);
		foundPost.save();
		res.json(newComment);
	});
});

//route to delete comment
app.delete("/api/posts/:postId/comments/:commentId", function (req, res) {
	var commentId = req.params.commentId;
		Comment.findOneAndRemove({ _id: commentId}, function (err, deleteComment) {
			res.json(deleteComment);
		});
});

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});

