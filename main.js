$(function (){
	console.log("hello world");

	//Compile Template
	//Need to create the source(our template id) to compile
	var source = $('#quotePost-template').html();
	//Can now compile the source
	var template = Handlebars.compile(source);

	//test data
	var allQuotes = [
		{	Category: 'Book', 
		Quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam! ',
		Author: 'John Dwyer'},
		{	Category: 'movie',
			Quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam!',
			Author: "Cristina"}
	];

	//Ajax call to get allQuotes
	$.get('/api/quotes', function (data){
		console.log(data);
		allQuotes = data.allQuotes;
		
		var quotesHtml = template({ taco : allQuotes });
		$('#quotes-list').append(quotesHtml);
	});

	/*var quotesHtml = template({ taco : allQuotes });
	$('#quotes-list').append(quotesHtml);*/

}); /*loading closing brace */