$(document).ready(function() {

	// compile handlebars template

	var source = $('#blogposts-template').html();
	var template = Handlebars.compile(source);

	// helper function to render all blogposts to view
	// note: we empty and re-render the collection each time our blogpost data changes

	var render = function() {
		// empty existing blogposts from view
		$blogpostsList.empty();

		// pass blogposts into the template function
		var blogpostsHtml = template({
			blogposts: allBlogposts
		});

		// append html to the view
		$blogpostsList.append(blogpostsHtml);
	};

	// API routes

	// AJAX call to GET all blogposts

	$.get('/api/blogposts', function(data) {
		allBlogposts = data.blogposts;

		var blogpostsHtml = template({
			blogposts: allBlogposts
		});
		$('#blogposts-list').append(blogpostsHtml);
	});
	console.log("GET route is working");

	/////////////////
	// POST route ///
	/////////////////

	// form to create a new blogpost, ie POST

	var $createBlogpost = $('#create-blogposts');
	console.log("the POST route has started.");

	$createBlogpost.on('submit', function(event) {
		console.log("submit was clicked.");
		event.preventDefault();

		// serialze form data
		var newBlogpost = $(this).serialize();

		// POST request to create new blogpost
		$.post('/api/blogposts', newBlogpost, function(data) {
			console.log(data);
			console.log("getting through the CREATE route");

			// add new book to allBlogposts
			$('#blogposts-list').append(blogpostsHtml);
			allBlogposts.push(data);

			// render all blogposts to view
			render();
		});

		// reset the form
		$createBlogpost[0].reset();
		$createBlogpost.find('input').first().focus();
	});


	///////////////////
	/// DELETE route///
	///////////////////

	// #blogposts-list

	$('#blogposts-list').on('click', '.delete-blogpost', function(event) {
		console.log("The delete button was clicked!");
		event.preventDefault();

		// find the blogpost's id (stored in HTML as data-id)
		var blogpostId = $(this).closest('#blogposts-list').attr('data-id');

		var blogpostsToDelete = allBlogposts.filter(function(blogpost) {
			return blogpost._id == blogpostId;
		})[0];

		console.log("Got through the click event in the DELETE route");
		// DELETE request to delete blogpost

		$.ajax({
			type: 'DELETE',
			url: '/api/blogposts/' + blogpostId,
			success: function(data) {
				// remove deleted blogpost from all blogposts
				console.log("Inside the AJAX call");
				allBlogposts.splice(allBlogposts.indexOf(blogpostsToDelete), 1);

				// render all blogposts to view
				render();
			}
		});
	});
});