function searchObject (ObjectString, callback) {
	var request = require('request');
	request.get('http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + ObjectString,function(err, response){
		var body = JSON.parse(response.body);
		if(err){
			callback(err);
		}else{
			callback(null,{title:body[1][0], description:body[2][0], link:body[3][0]});
		}
	});
}

module.exports.searchObject = searchObject