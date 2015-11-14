var express = require("express"),
	hbs = require("hbs");
	bodyParser = require("body-parser");
	mongoose = require("mongoose");
	app = express();


mongoose.connect("mongodb://localhost/microbog-app");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "hbs");
app.use(express.static("public"));

var Post = require("./models/post");

//set up posts api
app.get("/api/posts", function (req, res) {
	Post.find(function (err, allPosts) {
		res.json(allPosts);
	});
});

//create new post
app.post("/api/posts", function (req, res) {
	//create new post from form data
	var newPost = new Post(req.body);
	//save newPost in db
	newPost.save(function (err, newPost) {
		res.json(newPost);
	});
});

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});

