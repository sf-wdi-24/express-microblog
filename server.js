//require express and needed modules
var express = require("express"),
	hbs = require("hbs"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	cookieParser = require("cookie-parser"),
	session = require("express-session"),
	passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy;

var app = express();

var Post = require("./models/post");
var Comment = require("./models/comment");
var User = require('./models/user');


mongoose.connect("mongodb://localhost/microbog-app");

app.use(bodyParser.urlencoded({
	extended: true
}));
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
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", function(req, res) {
	res.render("index", {
		user: req.user
	});
});

//set up posts api
app.get("/api/posts", function(req, res) {
	Post.find()
		.populate("comments")
		.exec(function(err, allPosts) {
			res.json({
				posts: allPosts
			});
		});
});

//create new post
app.post("/api/posts", function(req, res) {
	//only allow user to post
	if (req.user) {
		//create new post from form data
		var newPost = new Post(req.body);
		newPost.like = false;
		newPost.author = req.user._id;
		newPost.time = (new Date()).toDateString();
		//save newPost in db
		newPost.save(function (err, newPost) {
			req.user.posts.push(newPost);
			req.user.save();
			res.json(newPost);
		});
	} else {
		res.status(401).json({ error: "Unauthorized"});
	}
});

//find specific post by its id

app.get("/api/posts/:id", function(req, res) {
	//get id from url
	var id = req.params.id;
	//find the post with specific id in db
	Post.findOne({
		_id: id
	}, function(err, foundPost) {
		res.json(foundPost);
	});
});

app.put("/api/posts/:id", function(req, res) {
	// get id
	var id = req.params.id;
	// find post by id
	Post.findOne({
		_id: id
	}, function(err, foundPost) {
		//assign new value to foundPost
		foundPost.title = req.body.title;
		foundPost.description = req.body.description;
		foundPost.like = req.body.like;
		foundPost.time = req.body.time;
		foundPost.category = req.body.category;
		//save edited foundPost to db
		foundPost.save(function(err, editedPost) {
			res.json(editedPost);
		});
	});
});

app.delete("/api/posts/:id", function(req, res) {
	//get id
	var id = req.params.id;
	//remove the post with that id
	Post.findOneAndRemove({
		_id: id
	}, function(err, deletedPost) {
		res.json(deletedPost);
	});
});

//route to create new comment 
app.post("/api/posts/:postId/comments", function(req, res) {
	var postId = req.params.postId;

	Post.findOne({
		_id: postId
	}, function(err, foundPost) {
		var newComment = new Comment(req.body);

		newComment.save();
		foundPost.comments.push(newComment);
		foundPost.save();
		res.json(newComment);
	});
});

//route to delete comment
app.delete("/api/posts/:postId/comments/:commentId", function(req, res) {
	var commentId = req.params.commentId;
	Comment.findOneAndRemove({
		_id: commentId
	}, function(err, deleteComment) {
		res.json(deleteComment);
	});
});

//route to edit comment
app.put("/api/posts/:postId/comments/:commentId", function(req, res) {
	var commentId = req.params.commentId;
	Comment.findOne({
		_id: commentId
	}, function(err, foundComment) {
		foundComment.text = req.body.text;
		foundComment.save(function(err, editComment) {
			res.json(editComment);
		});
	});
});

//AUTH ROUTES

//show signup view
app.get("/signup", function(req, res) {
	//if user is logged in, don't let them sign up again
	if (req.user) {
		res.redirect("/");
	} else {
		res.render("signup");
	}
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function(req, res) {
	User.register(new User({
			username: req.body.username
		}), req.body.password,
		function(err, newUser) {
			passport.authenticate('local')(req, res, function() {
				// res.send('signed up!!!');
				res.redirect("/profile");
			});
		}
	);
});

//show login view
app.get("/login", function(req, res) {
	//if user logged in, don't let any them see login page
	if (req.user) {
		res.redirect("/profile");
	} else {
		res.render("login", {
			user: req.user
		});
	}
});
//log in user
app.post('/login', passport.authenticate('local'), function(req, res) {
	// res.send('logged in!!!');
	res.redirect("/");
});

//logout user
app.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

// show user profile
app.get("/profile", function(req, res) {
	//only show profile if user login
	if (req.user) {
		res.render("profile", { user: req.user});
	} else {
		res.redirect("/login");
	}
});

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function() {
	console.log("I'm listening");
});