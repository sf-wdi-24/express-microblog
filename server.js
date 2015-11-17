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
var Comment = require("./models/comment");

app.get("/", function (req, res) {
	res.render("index");
});

//set up posts api
app.get("/api/posts", function (req, res) {
	// Post.find(function (err, allPosts) {
	// 	res.json({posts: allPosts});
	// });
	Post.find()
		.populate("comments")
			.exec(function (err, allPosts) {
				res.json({posts: allPosts});
			});
});

//create new post
app.post("/api/posts", function (req, res) {
	//create new post from form data
	var newPost = new Post(req.body);
	newPost.like = false;
	newPost.time = (new Date()).toDateString();
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
		foundPost.like = req.body.like;
		foundPost.time = req.body.time;
		foundPost.category = req.body.category;
		//save edited foundPost to db
		foundPost.save(function (err, editedPost) {
			res.json(editedPost);
		});
	});
});

app.delete("/api/posts/:id", function (req, res) {
	//get id
	var id = req.params.id;
	//remove the post with that id
	Post.findOneAndRemove({ _id: id}, function (err, deletedPost) {
		res.json(deletedPost);
	});
});

//route to create new comment 
app.post("/api/posts/:postId/comments", function (req, res) {
	var postId = req.params.postId;

	Post.findOne({ _id: postId}, function (err, foundPost) {
		var newComment = new Comment(req.body);

		newComment.save();
		foundPost.comments.push(newComment);
		foundPost.save();
		res.json(newComment);
	});
});

// app.delete("/api/posts/:postId/comments/:commentId", function (req, res) {
// 	var postId = req.params.postId;
// 	var commentId = req.params.commentId;
// 	Post.findOne({ _id: postId}, function (err, foundPost) {
// 		foundPost.findOneAndRemove({ _id: commentId}, function (err, deleteComment) {
// 			res.json(deleteComment);
// 		});
// 	});
// });

//listen to port 3000
var server = app.listen(process.env.PORT || 3000, function () {
	console.log("I'm listening");
});

