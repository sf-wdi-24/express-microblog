var express = require('express');
var app = express();
mongoose = require('mongoose');
bodyParser = require('body-parser');

var exphbs  = require('hbs');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
	extended: true
}));
mongoose.connect('mongodb://localhost/blog');

var Blog = require('./models/blog');

app.use(express.static(__dirname + '/public'))

// Homepage route
app.get('/', function(req, res) {
	res.render('index');
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Hello...Is it me your looking for..')
});