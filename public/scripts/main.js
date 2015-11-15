$(document).ready(function() {
	console.log('Ready!');

	var source = $('#blog-template').html();
	var template = Handlebars.compile(source);

	var baseUrl = '/api/blogs';
	var allBlogs = [];
	// var $blogList = $('#blog-template');
	var $blog_input = $('#blog-input');
	var $blogList = $('#blogs-list');

	// var allBlogs = [{
	// 	place: 'Berlin',
	// 	description: 'my friends and i in berlin',
	// 	image:'http://www.tonedeaf.com.au/wp-content/uploads/2013/03/berlin-germany-copy.jpg'
	// }];
	var blogsHtml = template({
		blog: allBlogs
	});

	$('#blogs-list').append(blogsHtml);



	var render = function() {
		// empty existing todos from view
		$blogList.empty();
		// pass `allTodos` into the template function
		var blogsHtml = template({
			blog: allBlogs
		});
		// append html to the view
		$blogList.append(blogsHtml);
	};

	// GET all blogs on page load
	$.get(baseUrl, function(data) {
		// set `allblogs` to blogs data from API
		allBlogs = data.blog;
		console.log(data.blog);

		$blogList.append(template({
			blog: allBlogs
		}));
	});

      //Add new task
  $blog_input.on('submit', function(event) {
    event.preventDefault();
    // serialze form data
    var newBlog = $(this).serialize();
    // POST request to create new book
    $.post(baseUrl, newBlog, function(data) {
      console.log(data);
      // add new book to `allBooks`
      allBlogs.push(data);
      $blogList.append(template({
        blog: allBlogs
      }));

      render();

    });
    $blog_input[0].reset();
    $blog_input.find('input').first().focus();
  });


});