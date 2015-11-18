$(function() {
  
  //make sure is retunring
  console.log("client side js running");

  // compile handlebars template
  var source = $('#blogPost-template').html();
  var template = Handlebars.compile(source);

  // array of test data
  var allBlogPosts;

  // AJAX call to GET all blogPosts
  $.get('/api/blogPosts', function (data) {
    allBlogPosts = data.blogPosts;
    
    var blogPostsHtml = template({posts: allBlogPosts});
    $('#blogPost-list').append(blogPostsHtml);
  });

});