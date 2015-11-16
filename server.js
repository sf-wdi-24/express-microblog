var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');
var Blogpost = require('./models/blogpost');


var app = express();


// Set up body-parser
app.use(bodyParser.urlencoded({ extended : true }));

// Set up static page directory
app.use(express.static(__dirname + '/public'));

// Set HBS view engine
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
	res.render('index');
});


// GET all blogposts
app.get('/api/posts', function (req, res){
	Blogpost.find(function (err, allBlogposts){
		res.json({ posts : allBlogposts});
	});
});

// GET one blogpost
app.get('/api/posts/:id', function (req, res){
	var postId = req.params.id;
	Blogpost.findOne({ _id: postId}, function (err, foundBlogpost){
		res.json(foundBlogpost);
	});
});

// POST new blogpost
app.post('/api/posts', function (req, res) {
	var newBlogpost = new Blogpost(req.body);
	newBlogpost.save(function (err, savedBlogpost) {
		res.json(savedBlogpost);
	});
});

// PUT (edit) blogpost
app.put('/api/posts/:id', function (req, res){
	var postId = req.params.id;
	Blogpost.findOne({_id: postId}, function (err, foundBlogpost){
		foundBlogpost.title = req.body.title;
		foundBlogpost.content = req.body.content;

		foundBlogpost.save(function (err, savedBlogpost){
			res.json(savedBlogpost);
		});
	});
});


// Server listening?
var server = app.listen(process.env.PORT || 3000, function(){
	console.log('HEY! LISTEN!');
});
