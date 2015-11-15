//Require the following libraries
var express = require('express');
var hbs = require('hbs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Blog = require('./models/Blog');

//connect mongo database to project
mongoose.connect('mongodb://localhost/blogs_app');

var app = express();

//tell express to use public dir for css and js
app.use(express.static(__dirname + '/public'));

//enable body-parser to gather data
app.use(bodyParser.urlencoded({extended: true}));

//allow express to render hbs pages for client
app.set('view engine','hbs');

//client home page
app.get('/', function (req,res) {
	res.render('index');
});

//gather blogs data from server
app.get('/api/blogs', function (req,res) {
	Blog.find(function (err , allBlogs) {
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
	var newBlog = new Blog(req.body);
	newBlog.save(function(err, savedBlog){
		res.json(savedBlog);
	});
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
		updatedBlog.comments = req.body.comments;
		updatedBlog.save(function (err, newUpdatedBlog) {
			res.json(newUpdatedBlog);
		});
	});
});

//set express to use localport
app.listen(3000, function(){
	console.log('ready to serve');
});