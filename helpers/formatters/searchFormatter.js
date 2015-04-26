var modelPattern = require('../modelPattern');

function format(model, callback){
	console.log('pipe serch mama: ' + model.raw);
	var google = require('google');
	var wikiAPi = require('../wikiAPi');
	var bingApi = require('../../data/search');

	var queryForSearch = '';
    var objectForSearch = '';
    var found = false;

    model.forEach(function(token, index){
    	if(['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'JJ', 'JJR', 'JJS', 'RB', 'RBR', 'RBS'].indexOf(token[1]) > -1 ){
    		queryForSearch += token[0] + ' ';
    	}

    	if(['NN', 'NNS'].indexOf(token[1]) > -1) {
    		if(!found){
	    		found = true;
	    		objectForSearch = token[0];
	    	}
	    	queryForSearch += token[0];
    	}
    });

    if(!queryForSearch && !objectForSearch){
    	callback(model);
    	return;
    }
    console.log(queryForSearch)
    var async = require('async');
    async.parallel({
	   google: function(cb){
	    	// google.resultsPerPage = 3;
			// var nextCounter = 0;
	        // google(queryForSearch, function (err, next, links){
	        	// console.log(links);
				// if(err){
					// console.log(err);
					// cb(null, null)
				// }else{
					// cb(null, links);
				// }
			// });
    	cb(null, null);
	    },
	    wiki: function(cb){
	        wikiAPi.searchObject(objectForSearch,function(err, wikiData){

	        	if(err){
	        		cb(null, null);
	        	}else{
	        		cb(null, wikiData);
	        	}
    		});
	    },
	    bing: function (cb){
	    	// bingApi.find(queryForSearch, function(err, bingData){
	    	// 	if(err){
	    	// 		console.log(err);
	    	// 		cb(null, null);
	    	// 	}else{
	    	// 		cb(null, bingData);
	    	// 	}
	    	// });
    		cb(null, null)
	    }
	},
	function(err, info){

		model.push(info);

		callback(model);
	});
}

module.exports.format = format;
