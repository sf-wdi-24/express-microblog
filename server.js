//server.js
//SERVER SIDE JAVASCRIPT
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at http://localhost:3000/');

});