$(document).ready(function (){
console.log('Ready');


$.get('/api/blogs', function (data){
	console.log(data);
	var blogList = data.blogs;
	blogArr = blogList;
});


});