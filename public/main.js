$(function () {
	var baseUrl = "/api/posts";
	var allPosts;
	var $postList = $("#posts-list");
	var source = $("#blog-template").html();
	var template = Handlebars.compile(source);

	function render() {
		$postList.empty();
		$("form").find("input[name='title'], textarea[name='description']").val("");
		var postsHtml = template({ posts: allPosts});
		$postList.append(postsHtml);
	}

	$.get(baseUrl, function (data) {
		allPosts = data.posts;
		render();
	});

	$("#new-post").on("submit", function (event) {
		event.preventDefault();
		var newPost = $(this).serialize();
		newPost.like = false;
		newPost.time = (new Date()).toDateString();
		$.post(baseUrl, newPost, function (data) {
			allPosts.push(data);
			render();
		});
	});

	$postList.on("click", ".edit-button", function (event) {
		event.preventDefault();
		var id = $(this).attr("id");
		$("#form" + id).toggle();
		var editPostIndex;
		allPosts.forEach(function (post) {
			if (post._id === id) {
				editPostIndex = allPosts.indexOf(post);
			}
		});
		$("#form" + id).on("submit", function (event) {
			var editedPost = $("#form" + id).serialize();
			editedPost= editedPost + "&like=" + allPosts[editPostIndex].like.toString() + "&time=" + allPosts[editPostIndex].time;
			event.preventDefault();
			$.ajax({
				type: "PUT",
				url: baseUrl + "/" + id,
				data: editedPost,
				success: function(data) {
					allPosts.splice(editPostIndex, 1, data);
					render();
				}
			});
		});
	});

	$postList.on("click", ".delete-button", function (event) {
		event.preventDefault();
		var id = $(this).attr("id").slice(3);
		var deletePostIndex;
		allPosts.forEach(function (post) {
			if (post._id === id) {
				deletePostIndex = allPosts.indexOf(post);
			}
		});
		$.ajax({
			type: "DELETE",
			url: baseUrl + "/" + id,
			data: allPosts[deletePostIndex],
			success: function (data) {
				allPosts.splice(deletePostIndex, 1);
				render();
			}
		});
	});

	$postList.on("click", ".like-button", function (event) {
		var id = $(this).attr("id").slice(4);
		$("#like" + id).toggleClass("btn-default").toggleClass("btn-info");
		var likePost = allPosts.filter(function (post) {
			return post._id == id;
		})[0];
		likePost = "title=" + likePost.title + "&description=" + likePost.description + "&like=" + (!likePost.like) + "&time=" + likePost.time;
		$.ajax({
			type: "PUT",
			url: baseUrl + "/" + id,
			data: likePost,
			success: function(data) {
				allPosts.splice(allPosts.indexOf(likePost), 1, data);
			}
		});
	});
});