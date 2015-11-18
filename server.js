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
  var newBlogPost = req.body;

  if (blogPosts.length > 0) {
    newBlogPost._id = blogPosts[blogPosts.length - 1]._id + 1;
  } else {
    newblogPosts._id = 1;
  }

  blogPosts.push(newBlogPosts);

  res.json(newBlogPost);
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