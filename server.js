var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
	mongoose = require('mongoose');
	hbs = require('hbs');

// bodyParser gets data out of forms

app.use(bodyParser.urlencoded({
	extended: true
}));

// use public forlder for static files

app.use(express.static(__dirname + '/public'));

// app.use(express.static('public'));

// set hbs as server view engine. 

app.set('view engine', 'hbs');

// connect to mongodb

mongoose.connect('mongodb://localhost/blogapp');

// require Blogpost model
var Blogpost = require('./models/blogpost');

// Homepage route (temp - pre Mongo)

app.get('/', function (req, res) {
	res.render('index');
});

// array of test data
// var allBlogposts = [{
// 	title: "The sun goes up, the sun goes down",
// 	story: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel neque recusandae doloribus qui dolorum. Molestiae inventore, corporis aut, impedit excepturi quidem temporibus! Consequuntur nobis labore eaque recusandae molestias illo maiores?"
// }, {
// 	title: "Once upon a time in a galaxy far, far way",
// 	story: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel neque recusandae doloribus qui dolorum. Molestiae inventore, corporis aut, impedit excepturi quidem temporibus! Consequuntur nobis labore eaque recusandae molestias illo maiores?"
// }, ];

// API routes

app.get('/api/blogposts', function (req, res) {
	Blogpost.find(function (err, allBlogposts) {
	res.json({ blogposts: allBlogposts });
	});
});

// trying to figure out how to get the action from the button

// app.post('/api/blogposts', function (req, res) {
// 	var newBlogpost = new Blogpost(req.body);
// 	newBlogpost.save(function (err, savedTodo) {
// 		res.json(savedblogPost);
// 	});
// });


// starting server on localhost: 3000
app.listen(3000, function() {
	console.log('server started');
});