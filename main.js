$(function() {

	var $postsTemplate = $('#posts-template').html();
	var $postsResults = $('#posts-results');

	// compile handlebars template
	var source = $postsTemplate;
	var template = Handlebars.compile(source);

	// seed data
	var allPosts = [
						{ post: 'This is a post.',
							name: 'Steven',
							time: '10:54',
							likes: 0 },
						{ post: 'This is another post.',
							name: 'Steven',
							time: '10:50',
							likes: 0 },
						{ post: 'This is yet another post.',
							name: 'Steven',
							time: '10:43',
							likes: 0 }
					];

	function render (data) {

	}

	$.get('/api/posts', function(data){
		allPosts = data.posts;
		console.log(allPosts);
		var postsHtml = template({ posts: allPosts });
		$postsResults.append(postsHtml);
	});


});