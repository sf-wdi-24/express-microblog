//Dependencies Declared
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');


//HOMEPAGE ROUTE
app.get('/', function (req, res){
	res.send('hello world');
});


//Start Server
app.listen(3000, function(){
	console.log("I'm listening");
});

