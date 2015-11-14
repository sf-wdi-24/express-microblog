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

//find specific post by its id

app.get("/api/posts/:id", function (req, res) {
	//get id from url
	var id = req.params.id;
	//find the post with specific id in db
	Post.findOne({ _id: id}, function (err, foundPost) {
		res.json(foundPost);
	});
});

app.put("/api/posts/:id", function (req, res) {
	// get id
	var id = req.params.id;
	// find post by id
	Post.findOne({ _id: id}, function (err, foundPost) {
		//assign new value to foundPost
		foundPost.title = req.body.title;
		foundPost.description = req.body.description;
		//save edited foundPost to db
		foundPost.save(function (err, editedPost) {
			res.json(editedPost);
		});
	});
});

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});

