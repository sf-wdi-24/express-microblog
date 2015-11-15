$(function(){
	
	// Sanity check
	console.log("client js up and running");


	//Handlebars template
	var source = $('#blog-template').html();
	var template = Handlebars.compile(source);
	var allBlogs;
	var blogHtml = template({blogs: allBlogs});

	//Render page function
	function render() {
		$('.insertContainer').empty();
		var blogHtml = template({blogs: allBlogs});
		$('.insertContainer').append(blogHtml);
	}

	//add blog postings to website
	$.get('/api/blogs', function(data) {
		allBlogs = data.blogs;
		var blogHtml = template({blogs: allBlogs});
		$('.insertContainer').append(blogHtml);
	});

	//add new blog post to website
	$('.newBlog').on('submit',function(event) {
		event.preventDefault();
		var blogData = $(this).serialize();
		console.log(blogData);
		$.post('/api/blogs/', blogData, function(data) {
			allBlogs.push(data);
			render();
			});
		});
	//update existing blog 
	$('.insertContainer').on('click', '.edit', function(event){
		var blogId = $(this).closest('.blog-content').attr('data-id');
		$('.insertContainer').on('submit', '.editBlogForm', function(event){
			event.preventDefault();
			var blogEdits = $(this).serialize();
			var blogUpdate = allBlogs.filter(function (blog) {
				return (blog._id == blogId);
			})[0];
			$.ajax({
				type: 'PUT',
				url: '/api/blogs/'+blogId,
				data: blogEdits, 
				success: function(data){
					allBlogs.splice(allBlogs.indexOf(blogUpdate), 1, data);
					render();
				}
			});
			$('.modal-backdrop.fade.in').remove();
		});
	});

//delete blog posting
$('.insertContainer').on('click', '.delete', function(event){
	var blogId = $(this).closest('.blog-content').attr('data-id');
	var blogDelete = allBlogs.filter(function (blog) {
				return (blog._id == blogId);
			})[0];
	$.ajax({
		type: 'DELETE',
		url: '/api/blogs/'+blogId,
		data: blogDelete,
		success: function(data){
			allBlogs.splice(allBlogs.indexOf(blogDelete),1);
			render();
		}
	});
});










});