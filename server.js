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

app.use(express.static(__dirname + '/public'));





// Get ALl Task 
app.get('/api/blogs', function(req, res) {
	//mongoose
	blog.find(function(err, allBlogs) {
		res.json({
			blog: allBlogs
		}); 											
	});

});

	//Post single task
	app.post('/api/blogs/', function(req, res) {
		//New blog with form data
		var newBlog = new Blog(req.body); 
		newBlog.save(function(err, savedBlog) {
			res.json(newBlog)
		});
	});


// delete todo
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


// Homepage route
app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Hello...Is it me your looking for..')
});