$(function() {

	var $postsTemplate = $('#posts-template').html();
	var $postsResults = $('#posts-results');
	var baseUrl = '/';
	var apiUrl = baseUrl + 'api/posts/';
	var $newPost = $('#add-post-btn');
	var $addPostForm = $('.add-post-form');
	var allPosts;


	// compile handlebars template
	var source = $postsTemplate;
	var template = Handlebars.compile(source);

	function render (data) {
		console.log('rendering');

		// clear the results and the form
		$postsResults.empty();
		$('input.formdata').val('');

		// render the data
		var postsHtml = template({ posts: allPosts });
		$postsResults.append(postsHtml);
	}

	function addPost (data) {
		$addPostForm.toggle();
		event.preventDefault();
		$addPostForm.on('submit', function() {
			var newPost = $(this).serialize();
			$.post(apiUrl, newPost, function(data) {
				allPosts.push(data);
				refresh();
			});
		});
	}

	function putPost (data) {
		event.preventDefault();
		var id = $(this).attr('id');
		$('#form'+id).toggle();
		$('#form'+id).on('submit', function(event) {
			event.preventDefault();
			$('#form'+id).toggle();
			var updatedPost = $(this).serialize();
			$.ajax({
				type: 'PUT',
				url: apiUrl + id,
				data: updatedPost,
				success: function (data) {
					var index = allPosts.indexOf(updatedPost);
					for (var i=0; i<allPosts.length; i++) {
						if (allPosts[i]._id === id) {
							index = i;
						}
					}
					allPosts.splice(index, 1, data);
					render();
				}
			});
		});
	}

	function deletePost() {
		console.log('deleting');
		event.preventDefault();
		var id = $(this).attr('id');
		$.ajax({
			type: 'DELETE',
			url: apiUrl + id,
			success: function (data) {
				var index;
				for (var i=0; i<allPosts.length; i++) {
					if (allPosts[i]._id === id) {
						index = i;
					}
				}
				allPosts.splice(index, 1);
				render();
				console.log('deleted');
			}
		});
	}


	// get all posts on page load
	$.get('/api/posts', function(data) {
		// get the data and save it to allPosts
		allPosts = data.posts;
		console.log(allPosts);

		// render the posts to the page
		render();
	});

	// click handlers for adding, updating, and deleting posts
	$newPost.on('click', addPost);
	$postsResults.on('click', '.glyphicon-pencil', putPost);
	$postsResults.on('click', '.glyphicon-trash', deletePost);
	$postsResults.on('click', )
	// $postsResults.on('click', '.glyphicon-star-empty', ??????);

});