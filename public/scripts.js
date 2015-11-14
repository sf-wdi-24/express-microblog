$(function(){
// Sanity check
console.log("client js up and running");


//Handlebars template
var source = $('#blog-template').html();
var template = Handlebars.compile(source);


//Test Data
var allBlogs = [
  {title: "weekly post",	blogContent: "here is where all the text will be going", category: "Category - 1", comments: "Yay for blogs!"},
	{title: "bi-weekly post",	blogContent: "more text here", category: "Category - 2", comments: "Horray for blogs!"}];


var blogHtml = template({blogs: allBlogs});

console.log(blogHtml);
$('.blog-container').append(blogHtml);
//Render page function


$.get('/api/blog', function(data) {
	console.log(data);
});



});