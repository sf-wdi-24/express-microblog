$(function() {

	console.log("script.js working.");
	var source = $('#posts-template').html(); // loads the html from .hbs
 	var template = Handlebars.compile(source);

 	getAllPosts();


 	// Add Single Post
 	$('.new-post-form').on('submit', function(e){
 		var title = $('#new-title').val();
		var body = $('#new-body').val();
		var url = $('#new-url').val();
		addPost(title, body, url);
 	});

	// Update Single Post
	$('.edit-form').on('submit', function(e){
		e.preventDefault();
		var id = $('#updateId').val();
		var title = $('#updateTitle').val();
		var body = $('#updateBody').val();
		var url = $('#updateURL').val();
		var favorite = $('#updateFavorite').val();
		console.log(id+title+body+url+favorite);
		updatePost(id, title, body, url, favorite);
	});

	// Delete Single Post
	$('#delete-post-form').on('click', function(e){
		e.preventDefault();
		console.log("inside delete");
		var id = $('#delete-post-form').attr('data-id');
		console.log(id);
		var answer = prompt("Are you sure you want to delete this? (Yes/No)");
		if(answer.toLowerCase() === "yes" || answer.toLowerCase() === "y" ){
			deletePost(id);
		}
	});


	// Get All Posts
 	function getAllPosts(){
		$.get('/api/posts', function(data){
			var allPosts = data.posts;
			var totalposts = allPosts.length;
			$('#total-count-badge').text(totalposts);
			var postsHtml = template({ posts: allPosts });
			$('#posts-list').append(postsHtml);
		});
	}

	// addPost function - calls API
	function addPost(title, body, url){
		$.ajax({
	      type: "POST",
	      url: 'http://localhost:3000/api/posts/',
	      data: {title: title, body: body, url: url},
	      success: function (data) {
	        console.log("Added new post!");
	        getAllPosts();
	      },
	      error: function (error) {
	        console.error(error);
	      }
	    });
	}

	// updatePost function - calls API
	function updatePost(id, title, body, url, favorite){
		console.log(title);
		$.ajax({
			type: "PUT",
			url: 'http://localhost:3000/api/posts/' + id,
			data: {title: title, body: body, url: url, favorite:favorite},
			success: function (data) {
				console.log("Updated post!");
				getAllPosts();
			},
			error: function (error) {
				console.error(error);
	    	}
	    });
	}

	// deletePost function - calls API
	function deletePost(id){
		$.ajax({
			type: "DELETE",
			url: 'http://localhost:3000/api/posts/' + id,
			success: function (data) {
	        	console.log("Deleted post!");
	        	window.location.href = "http://localhost:3000/posts";
	      	},
	      	error: function (error) {
	        	console.error(error);
	      	}
		});
	}

});