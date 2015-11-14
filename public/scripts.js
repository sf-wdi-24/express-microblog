$(document).ready(function (){
console.log('Ready');

// Compile handlebars
var source = $('#blog-template').html();
var template = Handlebars.compile(source);

$.get('/api/blogs', function (data){
	console.log(data);
	var blogList = data.blogs;
	blogArr = blogList;
});


});