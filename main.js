$(function (){
	console.log("hello world");

	//Compile Template
	//Need to create the source(our template id) to compile
	var source = $('#quotePost-template').html();
	//Can now compile the source
	var template = Handlebars.compile(source);

	//test data
	var allQuotes = [
		{	category: 'book', 
		quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam! ',
		author: 'John Dwyer'},
		{	category: 'movie',
			quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam!',
			author: "cristina"}
	];

	var quotesHtml = template({ taco : allQuotes });
	$('#quotes-list').append(quotesHtml);

}); /*loading closing brace */