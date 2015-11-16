//require express 
var express = require("express");
//require body parser
var bodyParser = require("body-parser");

var app = express();

//require mongoose
var mongoose = require("mongoose");

//connect the data base
mongoose.connect("mongodb://localhost/blog-posts-app");

//require schema
var Post = require("./models/blogpost");

//apply body parser package
app.use(bodyParser.urlencoded({extended:true}));

//connect public folder
app.use(express.static(__dirname + "/public"));

//defind server and connect to local host 3000
var server = app.listen(process.env.PORT || 3000, function(){
	console.log("listeniing");
});

//defind view engine for handelbars
app.set("view engine", "hbs");

//route for the blog posts page
app.get("/blog", function(req,res){
	res.render("index");
});

//get all the blog posts from the db
app.get("/api/blog-posts", function(req, res){
	Post.find(function(err, results){
		res.json({posts:results});
	});
});

//get one blog post with id
app.get("/api/blog-posts/:id", function(req, res){

	//post id to search
	var PostId = req.params.id;
	Post.findOne({_id: PostId}, function(err, result){
		console.log(result);
		res.json(result);
	});
});

//add new  blog post to the db
app.post("/api/blog-posts", function(req, res){
	console.log("req" + req);
	var newPost = new Post(req.body);

	//save the new post in the db
	newPost.save(function(err, savedPost){
		console.log(savedPost);
		res.json(savedPost);
	});
});

//delete a blog post from the db
app.delete("/api/blog-posts/:id", function(req, res){

	//post id to delete
	var postId = req.params.id;
	Post.findOneAndRemove({_id:postId}, function(err, deletedPost){
		console.log(deletedPost);
		res.json(deletedPost);
	});
});

//update a blog post

app.put("/api/blog-posts/:id", function(req, res){

	//post id to update
	var postId = req.params.id;
	Post.findOne({_id:postId}, function(err, postToUpdate){
		postToUpdate.topic = req.body.topic;
		postToUpdate.title = req.body.title;
		postToUpdate.content = req.body.content;
		postToUpdate.save(function(err, updatedPost){
		console.log(updatedPost);
		res.json(updatedPost);
		});
	});

});




