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
				console.log(id);
				$('.glyphicon-remove').toggle();

				console.log(this);
			});

	// POST new blogpost 
	$('#newBlogForm').on('submit', function (event) {
		event.preventDefault();
		var newBlogpost = $(this).serialize();

		$.post('/api/posts', newBlogpost, function (data) {
			console.log('POST DATA', data);

			blogArr.push(data);

			addBlogpost();
		});

		document.getElementById('newBlogForm').reset();
	});

// PUT (edit) blogpost
	$(document).on('submit', '.submitEdit', function (event) {
		event.preventDefault();
		var postId = $(this).closest('.pull-left').attr('id');
		console.log("THIS", this);
		console.log("POST ID", id);

		var postToUpdate = blogArr.filter(function (post){
			return post._id == postId;
		})[0];

		var updatedBlogpost = $(this).serialize();

		$.ajax({
			type: 'PUT',
			url: '/api/posts' + '/' + id,
			data: updatedBlogpost,
			success: function(data) {
				blogArr.splice(blogArr.indexOf(postToUpdate), 1, data);
				console.log()
				addBlogpost();
			}
		});
	});




});