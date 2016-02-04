// require express and other modules
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		hbs = require('hbs'),
		mongoose = require('mongoose'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;

// require models
var Post = require('./models/post'),
		Comment = require('./models/comment'),
		User = require('./models/user');

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

// include body parser to handle form inputs
app.use(bodyParser.urlencoded({ extended: true }));

// set up public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// set up route for homepage
app.get('/', function(req, res) {
	res.render('index', { user: req.user });
});

// connect to mongodb
mongoose.connect('mongodb://localhost/posts-app');

// require Post model
var Post = require('./models/post');

// set up auth routes
app.get('/signup', function(req, res) {
	res.render('signup', { user: req.user });
	// if user is loged in don't let them see signup view
	if (req.user) {
		res.redirect('/profile');
	} else {
		res.render('signup', { user: req.user });
	}
});

app.post('/signup', function(req, res) {
	// if user is logged in, don't let them sign up again
	if (req.user) {
		res.redirect('/profile');
	} else {
		User.register(new User({ username: req.body.username}), req.body.password,
			function (err, newUser) {
				passport.authenticate('local')(req, res, function() {
					// res.send('signed up');
					res.redirect('/profile');
				});
			}
		);
	}
});

app.get('/login', function(req, res) {
	// if user is loged in don't let them see signup view
	if (req.user) {
		res.redirect('/profile');
	} else {
		res.render('login', { user: req.user });
	}
});

app.post('/login', passport.authenticate('local'), function(req, res) {
	// res.send('logged in');
	res.redirect('/profile');
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/profile', function(req, res) {
	// if user is loged in don't let them see signup view
	if (req.user) {
		res.render('profile', { user: req.user });
	} else {
		res.render('login', { user: req.user });
	}
});

// set up api routes
app.get('/api/posts', function(req, res) {
	Post.find()
		.populate('comments')
		.exec(function(err, allPosts) {
			if (err) {
				res.json(err);
			} else {
				res.json({ posts: allPosts });
			}
		});
});

app.post('/api/posts', function(req, res) {
	if (req.user) {
		// use form data to create new post
		var newPost = new Post(req.body);
		newPost.time = (new Date()).toDateString();
		// newPost.name = req.user.username;

		// save new post in the database
		newPost.save(function(err, savedPost) {
			req.user.posts.push(savedPost);
			req.user.save();
			res.json(savedPost);
		});
	} else {
		res.status(401).json({ error: 'Unauthorized.'});
	}
});

app.get('/api/posts/:id', function(req, res) {
	// find url from parameters
	var postId = req.params.id;

	// find post in db using id
	Post.findOne({ _id: postId })
		.populate('comments')
		.exec(function(err, foundPost) {
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
		foundPost.time = (new Date()).toDateString();
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

// route to create new comment associated to post
app.post('/api/posts/:postId/comments', function (req, res) {
  // find post id from url params
  var postId = req.params.postId;

	// find post in db using id
	Post.findOne({ _id: postId }, function(err, foundPost) {
		
		// create new comment and save it
		var newComment = new Comment(req.body);
		newComment.commenttime = (new Date()).toDateString();
		newComment.save();

		// add new comment to the post, save it, and return the comment
		foundPost.comments.push(newComment);
		foundPost.save();
		res.json(newComment);
	});
});

app.put('/api/posts/:postId/comments/:commentId', function (req, res) {
	// find post id from url params
	var postId = req.params.postId;

	// find post in db using id
	Post.findOne({ _id: postId }, function(err, foundPost) {

	//		

	});
});

// start the server
app.listen(process.env.PORT || 5000, function() {
	console.log('listening');
});