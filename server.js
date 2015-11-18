// require express and other libraries
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Post = require('./models/blogPost'),
    User = require('./models/user');


// configure body-parser (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// use public folder for static files
app.use(express.static(__dirname + '/public'));


// // middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// // passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set hbs as server view engine
app.set('view engine', 'hbs');

// connect to mongodb
mongoose.connect('mongodb://localhost/blogPost-app');

// require Post and User model
var blogPost = require('./models/blogPost');
var User = require('./models/user');




// HOMEPAGE ROUTE

app.get('/', function (req, res) {
  res.render('index');
});





// // Set up AUTH ROUTES
// show signup view
app.get('/signup', function (req, res) {
  res.render('signup');
});
// // sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        // res.send('signed up!!!');
        res.redirect('/profile');
      });
    }
  );
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  // res.send('logged in!!!');
  res.redirect('/profile');
});

// show login view
app.get('/login', function (req, res) {
  res.render('login');
});

// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
  

  // // show user profile page
app.get('/profile', function (req, res) {
  res.render('profile', { user: req.user });
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        // res.send('signed up!!!');
        res.redirect('/profile');
      });
    }
  );
});




// API ROUTES





// 
// Read all blogsPosts from server
app.get('/api/blogPosts', function (req, res) {
  blogPost.find(function (err, allblogPosts) {
    res.json({ blogPosts: allblogPosts });
  });
});

// read one specific blog 
app.get('/api/blogPosts/:id', function (req, res) {
   var BlogPostId = parseInt(req.params.id);

   var foundBlogPost = blogPosts.filter(function (blogPost) {
   return blogPosts._id == blogPostsId;
   })[0];

 res.json(foundBlogPost);
});

// post new blog entry
app.post('/api/blogPosts', function (req, res) {
  var newBlogPost = new blogPost(req.body);

 // create new post - write new code---
 newBlogPost.save(function (err, savedBlogPost) {
  res.json(savedBlogPost);
 });

});

// Update bloPost
app.put('/api/blogPosts/:id', function (req, res) {
  var blogPostId = parseInt(req.params.id);

  var blogPostToUpdate = blogPosts.filter(function (blogPost) {
    return blobPosts._id == blogPostId;
  })[0];

  blogPostToUpdate.task = req.body.task;
  blogPostToUpdate.description = req.body.description;

  res.json(blogPostToUpdate);
});


//Delete a blog Post

app.delete('/api/blogPosts/:id', function (req, res) {
  var blogPostsId = parseInt(req.params.id);

  var BlogPostToDelete = todos.filter(function (blogPost) {
    return blogPosts._id == blogPostsId;
  })[0];

  blogPosts.splice(blogPosts.indexOf(BlogPostToDelete), 1);

  res.json(blogPostToDelete);
});


// start server on localhost:3000
var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Microblog express app listening at http://localhost:3000/');
  });