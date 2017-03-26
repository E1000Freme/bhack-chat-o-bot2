var watson = require('watson-developer-cloud');
var tmdbapi = require('./TmdbAPI');

var conversation = watson.conversation({
	username: 'f0687c8d-d04d-410d-9c7c-20c5dc0d98c7',
	password: 'V5ci6kbfHdZu',
	version: 'v1',
	version_date: '2017-02-03'
});

module.exports = {
	getMessage : function(msg, callback){
	var api = new tmdbapi('7cfef515814114ce9c96181ca01394f3');
	var context = {};
	conversation.message({
		workspace_id: '530e0e68-7fec-4c15-b002-66d6179063c8',
		input: {'text': msg},
		context: context
	},function(err, response) {
	if (err){
		console.log('error:', err);
	}
	else{
	console.log(JSON.stringify(response, null, 2));
	var msgReturn;
	var genre = response.entities[0] ? response.entities[0].value : '';
	if(genre !== ''){
		api.getMovieByGenre(genre, function(data){
			try{
				var movieNo = Math.floor(Math.random()*20);
				var movie = data['results'][movieNo];
				console.log(movie);
				msgReturn = {
					msg:response.output.text[0],
					name: movie['original_title'],
					over: movie['overview'],
					vote_average: movie['vote_average'],
					img: api.imageBaseURL + movie['poster_path']
				};
			}catch(error){
				msgReturn = {
					msg: response.output.text[0]
				};
			}
			callback(msgReturn);
		});
	}else{
		msgReturn = {
			msg: response.output.text[0]
		};
		callback(msgReturn);
	}


	}

});
}};