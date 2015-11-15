// require express and other modules
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// set up public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs
app.set('view engine', 'hbs');

// set up route for homepage
app.get('/', function(req, res) {
	res.render('index');
});

// seed data
var allPosts = [
					{ post: 'This is a post.',
						name: 'Steven',
						time: '10:54',
						likes: 0 },
					{ post: 'This is another post.',
						name: 'Steven',
						time: '10:50',
						likes: 0 },
					{ post: 'This is yet another post.',
						name: 'Steven',
						time: '10:43',
						likes: 0 }
				];

// set up api routes
app.get('/api/posts', function(req, res) {
	res.json({ posts: allPosts });
});

// start the server
app.listen(process.env.PORT || 5000, function() {
	console.log('listening');
});