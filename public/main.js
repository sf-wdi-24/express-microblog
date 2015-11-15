$(function(){

//handlebars set up for posts
var baseUrl = '/api/posts';
var $postslist = $('#posts-list');
var source = $('#posts-template').html();
var template = Handlebars.compile(source);

var allPosts = [];

var render = function() {
	// empty existing todos from view
	$postslist.empty();

	// pass `allTodos` into the template function
	var postsHtml = template({
		posts: allPosts //allTodos in mongo
	});

	// append html to the view
	$postslist.append(postsHtml);
	};


$.get(baseUrl, function(data) {
	console.log("hello");
	//set allTodos to todo data from API
	allTodos = data.posts;
});











});