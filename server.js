var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({ extended : true }));

// Set up static page directory
app.use(express.static(__dirname + 'public'));

// Set HBS view engine
app.set('view engine', 'hbs');






var server = app.listen(process.env.PORT || 3000, function(){
	console.log('HEY! LISTEN!');
});
