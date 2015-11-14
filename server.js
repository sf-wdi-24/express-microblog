var express = require('express');
var app = express();

  app.get('/', function (req, res) {
    res.send('Hello BlogPost App!');
  });

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Microblog express app listening at http://localhost:3000/');
  });