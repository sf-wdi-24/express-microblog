var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var blog = require('./models/blog');

var exphbs  = require('hbs');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
	extended: true
}));
mongoose.connect('mongodb://localhost/blog');

var Blog = require('./models/blog');
var Comment = require('./models/comments');

app.use(express.static(__dirname + '/public'));





// // Get ALl Blogs 
// app.get('/api/blogs', function(req, res) {
// 	//mongoose
// 	blog.find(function(err, allBlogs) {
// 		res.json({
// 			blog: allBlogs
// 		}); 											
// 	});

//});

// get all blogs with comments

// route to get all tweets
app.get('/api/blogs', function (req, res) {
  Tweet.find()
    .populate('comments')
      .exec(function (err, allBlogs) {
        if (err) {
          res.json(err);
        } else {
          res.json(allTweets);
        }
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
app.delete('/api/blogs/:id', function (req, res) {
  // get blog id from url params (`req.params`)
  var blogId = req.params.id;

  // find blog in db by id and remove
  blog.findOneAndRemove({ _id: blogId }, function (err, deletedBlog) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(deletedBlog);
    }
  });
});


// update task

app.put('/api/blogs/:id', function (req, res) {
  var blogId = req.params.id;

  blog.findOne({ _id: blogId }, function (err, foundBlog) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
     
      foundBlog.place = req.body.place;
      foundBlog.description = req.body.description;
      foundBlog.image = req.body.image;

      // save updated blog in db
      foundBlog.save(function (err, savedBlog) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(savedBlog);
        }
      });
    }
  });
});


// Homepage route
app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Hello...Is it me your looking for..')
});