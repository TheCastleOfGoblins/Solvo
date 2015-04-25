function  defaultSearch(stringAfterPos, callback) {
	var google = require('google');
	var wikiAPi = require('./wikiAPi');
	var bingApi = require('../data/search.js');
	
	var queryForSearch = '';
    var objectForSearch = '';
    var found = false;
    stringAfterPos.forEach(function(token, index){
    	if(['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ', 'JJ', 'JJR', 'JJS', 'RB', 'RBR', 'RBS'].indexOf(token[1]) > -1 ){
    		queryForSearch += token[0] + ' ';
    	}

    	if(['NN', 'NNS'].indexOf(token[1]) > -1) {
    		if(!found){
	    		found = true;
	    		objectForSearch = token[0];
	    	}
	    	objectForSearch += token[0];
    	}
    });
    var async = require('async');
    async.parallel({
	    google: function(cb){
	    	google.resultsPerPage = 2;
			var nextCounter = 0;
	        google(queryForSearch, function (err, next, links){
				if(err){
					console.log(err);
					callback(null, null)
				}else{
					callback(null, links[0]);
				}
			});	
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
	    	bingApi.find(queryForSearch, function(err, bingData){
	    		if(err){
	    			cb(null, null);
	    		}else{
	    			cb(null, bingData);
	    		}
	    	});
	    }
	},
	callback);
    

    console.log(queryForSearch, objectForSearch);
}
module.exports.defaultSearch = defaultSearch;