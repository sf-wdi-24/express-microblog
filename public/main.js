$(function() {

	var $postsTemplate = $('#posts-template').html();
	var $postsResults = $('#posts-results');

	// compile handlebars template
	var source = $postsTemplate;
	var template = Handlebars.compile(source);

	function render (data) {

	}

	$.get('/api/posts', function(data){
		allPosts = data.posts;
		console.log(allPosts);
		var postsHtml = template({ posts: allPosts });
		$postsResults.append(postsHtml);
	});


});