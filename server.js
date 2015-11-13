var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var server = app.listen(process.env.PORT || 3000, function(){
	console.log('HEY! LISTEN!');
});
