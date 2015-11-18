$(document).ready(function (){
	console.log('Ready');

	var id;

	// Compile handlebars
	var source = $('#blog-template').html();
	var template = Handlebars.compile(source);

	var blogArr = [];
	console.log('BLOG ARRAY', blogArr);
	var $blogBody = $('#blog-body');

	function addBlogpost() {
		$blogBody.empty();
		var blogHtml = template({
			posts: blogArr
		});
		$blogBody.append(blogHtml);
	}

// GET all blogposts
	$.get('/api/posts', function (data) {
		console.log(data);
		console.log('DATA.BLOGS', data.posts);
		blogArr = data.posts;
		addBlogpost();
	});

	$(document).on('click', '.glyphicon-pencil', function (event) {
				event.preventDefault();
				id = $(this).attr('id');
				$('.glyphicon-remove').toggle();
				$('.glyphicon-comment').toggle();

			});

		$(document).on('click', '.glyphicon-comment', function (event) {
				event.preventDefault();
				id = $(this).attr('id');
				console.log('THIS ID', id);
				$('.glyphicon-remove').toggle();
				$('.glyphicon-pencil').toggle();

			});

	// POST new blogpost 
	$('#newBlogForm').on('submit', function (event) {
		event.preventDefault();
		var newBlogpost = $(this).serialize();

		$.post('/api/posts', newBlogpost, function (data) {

			blogArr.push(data);

			addBlogpost();
		});

		document.getElementById('newBlogForm').reset();
	});

		// POST new comment 
	$(document).on('submit', '.submitComment', function (event) {
		event.preventDefault();
		console.log('THIS', this);
		var newComment = $(this).serialize();
		$.ajax ({
			type: 'POST',
			url: '/api/posts/' + id + '/comments',
			data: newComment,
			success: function(data) {
				var post = blogArr.filter(function (post){
					return post._id == id;
				})[0];
				console.log('POST', post);
				console.log('DATA', data);
				post.comments.push(data);
				addBlogpost();
			}
		});

		document.getElementById('newBlogForm').reset();
	});

// PUT (edit) blogpost
	$(document).on('submit', '.submitEdit', function (event) {
		event.preventDefault();
		var postId = $(this).closest('.pull-left').attr('id');

		var postToUpdate = blogArr.filter(function (post){
			return post._id == postId;
		})[0];

		var updatedBlogpost = $(this).serialize();

		$.ajax({
			type: 'PUT',
			url: '/api/posts/' + id,
			data: updatedBlogpost,
			success: function(data) {
				blogArr.splice(blogArr.indexOf(postToUpdate), 1, data);
				addBlogpost();
			}
		});
	});
// DELETE blogpost
	$(document).on('click', '.blogpostRemove', function (event) {
		event.preventDefault();
		var postId = $(this).closest('.pull-left').attr('id');
		console.log('DELETE ID', postId);
		var postToDelete = blogArr.filter(function (post) {
			return post._id == postId;
		})[0];

		$.ajax({
			type: 'DELETE',
			url: '/api/posts/' + postId,
			success: function (data) {
				blogArr.splice(blogArr.indexOf(postToDelete), 1);
				addBlogpost();
			}
		});
	});


// DELETE comment 
$(document).on('click', '.commentRemove', function (event) {
	event.preventDefault();
	var commentId = $(this).attr('id');

	console.log('COMMENT ID', commentId);
	var commentDeleteIndex;
	var postContCom;

	blogArr.forEach(function (post) {
		post.comments.forEach(function (comment) {
			if (comment._id == commentId) {
				commentDeleteIndex = post.comments.indexOf(comment);
				postContCom = post;
			}
		});
	});
	console.log(commentDeleteIndex);
	

	$.ajax({
		type: 'DELETE',
		url: '/api/posts/' + postContCom._id + '/comments/' + commentId,
		success: function (data) {
			postContCom.comments.splice(commentDeleteIndex, 1);
			addBlogpost();
		}
	});
	//console.log("Comment Delete", commentToDelete);
});

});