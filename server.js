var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  blog = require('./models/blog');

var Blog = require('./models/blog');
//var Post = require('./models/post');
var User = require('./models/user');


var cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;


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

var exphbs = require('hbs');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect('mongodb://localhost/blog');



app.use(express.static(__dirname + '/public'));



app.post('/signup', function(req, res) {
  User.register(new User({
      username: req.body.username
    }), req.body.password,
    function(err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send('signed up!!!');
      });
    }
  );
});

// Get ALl Blogs 
app.get('/api/blogs', function(req, res) {
  //mongoose
  blog.find(function(err, allBlogs) {
    res.json({
      blog: allBlogs
    });
  });

});

//Post single blog
app.post('/api/blogs/', function(req, res) {
  //New blog with form data
  var newBlog = new Blog(req.body);
  newBlog.save(function(err, savedBlog) {
    res.json(newBlog)
  });
});


// delete blog
app.delete('/api/blogs/:id', function(req, res) {
  // get blog id from url params (`req.params`)
  var blogId = req.params.id;

  // find blog in db by id and remove
  blog.findOneAndRemove({
    _id: blogId
  }, function(err, deletedBlog) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {
      res.json(deletedBlog);
    }
  });
});


// update task

app.put('/api/blogs/:id', function(req, res) {
  var blogId = req.params.id;

  blog.findOne({
    _id: blogId
  }, function(err, foundBlog) {
    if (err) {
      res.status(500).json({
        error: err.message
      });
    } else {

      foundBlog.place = req.body.place;
      foundBlog.description = req.body.description;
      foundBlog.image = req.body.image;

      // save updated blog in db
      foundBlog.save(function(err, savedBlog) {
        if (err) {
          res.status(500).json({
            error: err.message
          });
        } else {
          res.json(savedBlog);
        }
      });
    }
  });
});

// show user profile page
app.get('/profile', function (req, res) {
  res.render('profile', { user: req.user });
});
// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  res.send('logged in!!!');
});

// show login view
app.get('/login', function (req, res) {
  res.render('login');
});
// show signup view
app.get('/signup', function(req, res) {
  res.render('signup');
});

// Homepage route
app.get('/', function(req, res) {
  res.render('index');
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Hello...Is it me your looking for..')
});