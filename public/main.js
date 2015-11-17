$(function() {
  
  //make sure is retunring
  console.log("client side js running")

  // compile handlebars template
  var source = $('#microblog-template').html();
  var template = Handlebars.compile(source);

  // array of test data
  var allBlogPosts = [
    { Post: 'BlogPost', category: 'BlogPost' },
    
  ];

  // AJAX call to GET all workouts
  $.get('/api/blogPosts', function (data) {
    allblogPosts = data.blogPosts;
    
    var blogPostsHtml = template({ blogPosts: allBlogPosts });
    $('#blogPosts-list').append(blogPostsHtml);
  });

});