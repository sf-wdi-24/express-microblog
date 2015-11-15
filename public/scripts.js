$(function(){
// Sanity check
console.log("client js up and running");


//Handlebars template
var source = $('#blog-template').html();
var template = Handlebars.compile(source);
var allBlogs;
var blogHtml = template({blogs: allBlogs});

console.log(blogHtml);
$('.blog-container').append(blogHtml);
//Render page function


$.get('/api/blogs', function(data) {
	allBlogs = data.blogs;
	var blogHtml = template({blogs: allBlogs});
	$('.blog-container').append(blogHtml);

});



});