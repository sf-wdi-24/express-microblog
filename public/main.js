$(function (){
	console.log("hello world");

	//Compile Template
	//Need to create the source(our template id) to compile
	var source = $('#quotePost-template').html();
	//Can now compile the source
	var template = Handlebars.compile(source);

	//test data
	var allQuotes = [
	{	category: 'Book', 
		statement: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam! ',
		author: 'John Dwyer'},
	{	category: 'movie',
		statement: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam!',
		author: "Cristina"}
	];



	//Show all quotes on pageload
	$.get('/api/quotes', function (data){
			/*console.log(data);*/
			allQuotes = data.quotes;
			var quotesHtml = template({ quotes: allQuotes });
			$('#quotes-list').append(quotesHtml);
			
	});

	//Show all quotes on submit
	$('#showAll').on('click', function (e){
		$.get('/api/quotes', function (data){
			/*console.log(data);*/
			allQuotes = data.quotes;
			var quotesHtml = template({ quotes: allQuotes });
			$('#quotes-list').append(quotesHtml);
		});
	});

	//Make new quote
	//NEEDS WORK
	$('#create-quote').on('submit', function (e) {
		newQuote = $(this).serialize();
		$.post('/api/quotes', function (data) {
			console.log(data); 
		});
	});
		
		
	
		

	/*var quotesHtml = template({ taco : allQuotes });
	$('#quotes-list').append(quotesHtml);*/

}); /*loading closing brace */