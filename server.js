var express = require('express');
var hbs = require('hbs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//Test Data
var allBlogs = [
  {title: "weekly post",	blogContent: "here is where all the text will be going", category: "Category - 1", comments: "Yay for blogs!"},
	{title: "bi-weekly post",	blogContent: "more text here", category: "Category - 2", comments: "Horray for blogs!"}];

app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs');

app.get('/', function(req,res) {
	res.render('index');
});

app.get('/api/blog', function(req,res) {
	res.json({blogs: allBlogs});
});


app.listen(3000, function(){
	console.log('ready to serve');
});