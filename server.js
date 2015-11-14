var express = require("express"),
	hbs = require("hbs");
	bodyParser = require("body-parser");
	mongoose = require("mongoose");
	app = express();


mongoose.connect("mongodb://localhost/microbog-app");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "hbs");
app.use(express.static("public"));

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});
