$(function (){
	console.log("hello world");

	//Compile Template
	//Need to create the source(our template id) to compile
	var source = $('#quotePost-template').html();
	//Can now compile the source
	var template = Handlebars.compile(source);

	//test data
	var quotes = [
	{	category: 'Book', 
		quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam! ',
		author: 'John Dwyer'},
	{	category: 'movie',
		quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam!',
		author: "Cristina"}
	];

	//Ajax call to get allQuotes
	$.get('/api/quotes', function (data){
		/*console.log(data);*/
		allQuotes = data.quotes;
		
		var quotesHtml = template({ quotesbars: quotes });
		$('#quotes-list').append(quotesHtml);
	});

	/*var quotesHtml = template({ taco : allQuotes });
	$('#quotes-list').append(quotesHtml);*/

}); /*loading closing brace */