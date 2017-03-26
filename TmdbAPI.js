var request = require('request');

function TmdbAPI(api_key){
	this.apiKey = api_key;
	this.baseURL = "https://api.themoviedb.org/3/";
	this.tail = "&adult=false";
	this.imageBaseURL ="https://image.tmdb.org/t/p/w500/";


	/**
	 * Get first movie based on Name query
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	this.getMovieByName = function(name, callback){
		var type = "search/movie";
		var query = name;
		var url = this.baseURL + type + "?api_key=" + this.apiKey + "&query=" +query + this.tail;
		var response;
		var context = this;

		request(url, function(error, response, body){
			callback(JSON.parse(body));
		});

		//Front-end ready
		/*jQuery.get({
			url: url,
			method:"get",
			success: function(data){
				if(data["results"].length > 0){
					response = data["results"][0];
					var src = context.imageBaseURL+response["poster_path"];
					console.log(src);
					$("#poster img").attr('src', src);
				}else{
				//todo
				}
			}
		});*/
	};

	/**
	 * Get first movie based on the genre
	 * @param  {[type]} genre [description]
	 * @return {[type]}        [description]
	 */
	this.getMovieByGenre = function(genre, callback){
		var query = "genre/"+this.getGenreId(genre)+"/movies";
		var url = this.baseURL + query + "?api_key=" + this.apiKey + this.tail;
		var response;
		var context = this;

		request(url, function(error, response, body){
			callback(JSON.parse(body));
		});


		// jQuery.get({
		//	url: url,
		//	method:"get",
		//	success: function(data){
		//		if(data["results"].length > 0){
		//			response = data["results"][0];
		//			var src = context.imageBaseURL+response["poster_path"];
		//			console.log(src);
		//			$("#poster img").attr('src', src);
		//		}else{
		//		//todo
		//		}
		//	}
		// });
	};

	this.getGenreId = function(genreName){
		genreName = genreName.toLowerCase();
		var ret;
		switch (genreName){

			case "action":
				ret = 28;
				break;
			case "adventure":
				ret = 12;
				break;
			case "animation":
				ret = 16;
				break;
			case "comedy":
				ret = 35;
				break;
			case "crime":
				ret = 80;
				break;
			case "documentary":
				ret = 99;
				break;
			case "drama":
				ret = 18;
				break;
			case "family":
				ret = 10751;
				break;
			case "fantasy":
				ret = 14;
				break;
			case "history":
				ret = 36;
				break;
			case "horror":
				ret = 27;
				break;
			case "music":
				ret = 10402;
				break;
			case "mystery":
				ret = 9648;
				break;
			case "romance":
				ret = 10749;
				break;
			case "science fiction":
				ret = 878;
				break;
			case "tv movie":
				ret = 10770;
				break;
			case "thriller":
				ret = 53;
				break;
			case "war":
				ret = 10752;
				break;
			case "western":
				ret = 37;
				break;
		}

		return ret;

	};
}

module.exports = TmdbAPI;