$(document).ready(function(){

	//sanity check for js
	console.log("JS is ready");

	//compile hendalebars
	var source = $("#posts").html();
	var template = Handlebars.compile(source); 

	//create list of blog posts function
	function createList(){

		//get all the blog posts from the db
		$.get("/api/blog-posts", function(data){
			var appendedPost = template({blogPosts:data.posts});
			$("#results").append(appendedPost); 
		});
	}

	//event of click on the new post button
	$("#newPost").click(function(event){
		event.preventDefault();
		$("#formDiv").toggle();
	});

	//post a new blog
	$("#newPostForm").submit(function(event){
		event.preventDefault();
		var dataPost = $("#newPostForm").serialize();
		console.log(dataPost);
		dataPost.likes = 0;

		$.post("/api/blog-posts", dataPost, function(data){
			console.log(dataPost);

			//clean the actual list before creating a new list
			$("#results >div").remove();
			createList();
			$("#newTitle").val("");
			$("#newContent").val("");

			//close the form
			$("#formDiv").toggle();
			});
		});
	

	//delete a post
	$("#results").on("click", ".delete", function(event){

		//read the id of the item
		var itemId = $(this).attr("id");
		console.log(itemId);
		$.ajax({ 
			type: "DELETE",
			url: "/api/blog-posts/" + itemId,
			success: function(data){

				console.log(data.title + "deleted");

				//clean the actual list before creating a new list
				$("#results >div").remove();
				createList();
				},
			error: function(err){
				console.log(err);
			}			
		});
	});

	//edit a post

	$("#results").on("click", ".edit", function(event){

		//item Id
		editId = $(this).attr("id");

		//open the specific update form
		$("#updateForm"+editId).toggle();
		$.get("/api/blog-posts/"+editId, function(data){

			//place the old data in the update form
			$("#updateTopic"+editId).val(data.topic);
			$("#updateTitle"+editId).val(data.title);
			$("#updateContent"+editId).val(data.content);
			$("#updateForm"+editId).submit(function(event){
				event.preventDefault();
				var ItemToUpdate = $(this).serialize();
				$.ajax({
					type: "PUT",
					url: "/api/blog-posts/"+editId,
					data: ItemToUpdate,
					success: function(data){
								console.log(ItemToUpdate + "updated");
								
								//clean the actual list before creating a new list
								$("#results >div").remove();
								createList();
					},
					error: function(err){
						console.log(err);
					}
				});

			});

			
		});
		
	});



// //search posts by topic - incomplete
// $("#searchBar").change(function(event){
// 	var foundItem = [];
// 	var searchedTopic = $("#searchBar").val();
// 	event.preventDefault();
// 	if(searchedTopic==="All"){
// 		$("#results >div").remove();
// 		createList();
// 	}
// 	else{
// 		$("#results >div").remove();
// 		$.get("/api/blog-posts", function(data){

// 		for(var i=0; i<data.posts.length; i++){
// 			if(data.posts[i].topic===searchedTopic){
// 				foundItem.push(data.posts[i]);
// 			}
// 		}
// 		console.log(foundItem);
// 		var appendedPost = template({blogPost:foundItem});
// 		$("#results").append(appendedPost); 	
// 		});
// 	}
// });

//like counter and update - incomplete 
// $("#results").on("click", ".like", function(event){

// 	//item ID
// 	editId = $(this).attr("id");

//  	//search for thre item in the DB
//  	$.get("/api/blog-posts/"+editId, function(data){
// 		 var ItemToUpdate = $(this).serialize();
// 		 ItemToUpdate.likes+=1;
// 		 console.log(ItemToUpdate);
//  		$.ajax({
// 				type: "PUT",
// 				url: "/api/blog-posts/"+editId,
// 				data: ItemToUpdate,
// 					success: function(data){
// 								console.log(ItemToUpdate + "updated");
								
// 								//clean the actual list before creating a new list
// 								$("#results >div").remove();
// 								createList();
// 					},
// 					error: function(err){
// 						console.log(err);
// 					}
// 		});
// 	});

// });

//add comment to the db
$("#results").on("submit", ".commentForm", function(event){

	event.preventDefault();
	newComment = $(this).serialize();
	var itemId = $(this).attr("id");

	//create url to the route 
	var url = "/api/blog-posts/"+itemId+"/comments";

	$.post(url, newComment, function(data){

			//clean the actual list before creating a new list
			$("#results >div").remove();
			createList();
			$(".comments").val("");
	});
});

//delete a comment
$("#results").on("click", ".deleteComment", function(event){
	event.preventDefault();
	var itemId=$(this).attr("id");

	$.ajax({
		type: "DELETE",
		url:"/api/blog-posts/comments/"+itemId,
		success: function(data){
			console.log(itemId + " comment deleted");
			$("#results >div").remove();
			createList();
		},
		error: function(err){
			console.log(err);
		}
	});

});

//update a comment 
$("#results").on("click", ".editComment", function(event){
	event.preventDefault();
	var itemId = $(this).attr("id");
	console.log(itemId);
	$.get("/api/blog-posts/comments/"+itemId, function(data){
		$("#commentBar"+itemId).val(data.text);
	});
	// $.ajax({
	// 	type: "PUT",
	// 	url:"/api/blog-posts/comments/"+itemId,
		 

	});

createList();
});


		