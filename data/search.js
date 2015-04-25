function find (query, callback) {
  var key = 'kSXNzjzaIohjprLZnZ8YGxVOky2fIkEncWOLmehHZZo';
  var request = require("request");
  var baseQueryUri = "https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=";
  var formattedQuery = "%27" + encodeURIComponent(query) + "%27";
  var jsonFormat = "&$format=json";
  var queryUri = baseQueryUri + formattedQuery + jsonFormat;
  var authToken = new Buffer(":" + key).toString('base64');
  
  
  var options = {
    url: queryUri,
    headers: {
      "Authorization": "Basic " + authToken
    }
  };

  request.get(options,function(err, response){
    var body = JSON.parse(response.body); 
    callback(err, body.d.results[0]);
  });
}

module.exports.find = find;