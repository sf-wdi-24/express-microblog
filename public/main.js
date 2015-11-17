$(function (){
	console.log("hello world");

	//Compile Template
	//Need to create the source(our template id) to compile
	var source = $('#quotePost-template').html();
	//Can now compile the source
	var template = Handlebars.compile(source);

	//button to show all quotes
	var $showAll = $('#showAll');
	//form to create new quote
	var $createQuote = $('#create-quote');
	//form to delete a quote
	var $deleteQuote = $('#delete-quote');
	
	//test data
	var allQuotes = [];
	/*var allQuotes = [
	{	category: 'Book', 
		statement: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam! ',
		author: 'John Dwyer'},
	{	category: 'movie',
		statement: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ipsum architecto error minima accusantium sapiente in aliquam!',
		author: "Cristina"}
	];*/



	//Show all quotes on pageload
	$.get('/api/quotes', function (data) {
			/*console.log(data);*/
			allQuotes = data.quotes;
			var quotesHtml = template({ quotes: allQuotes });
			$('#quotes-list').append(quotesHtml);
			
	});

	//Show all quotes on submit
	$('#showAll').on('click', function (e) {
		$.get('/api/quotes', function (data) {
			/*console.log(data);*/
			allQuotes = data.quotes;
			var quotesHtml = template({ quotes: allQuotes });
			$('#quotes-list').append(quotesHtml);
		});
	});

	//Show and search for quote by id
	$.get('/api/quote/:id', function () {
		
	});

	//Make new quote
	//NEEDS WORK
	$createQuote.on('submit', function (e) {
		quoteNew = $(this).serialize();
		
		$.post('/api/quotes', quoteNew, function (data) {
			console.log(data); 
			//adding to array of all quotes
			allQuotes.push(data);
			//render onto screen
			var quotesHtml = template({ quotes: allQuotes });
			$('#quotes-list').append(quotesHtml);


		});
	});
		
		
	//Delete Quote
	$deleteQuote.on('submit', function (e) {
		
	});
		

	/*var quotesHtml = template({ taco : allQuotes });
	$('#quotes-list').append(quotesHtml);*/

}); /*loading closing brace */