function find (query, callback) {
  var key = 'kSXNzjzaIohjprLZnZ8YGxVOky2fIkEncWOLmehHZZo';
  var request = require("request");
  var baseQueryUri = "https://api.datamarket.azure.com/Bing/Search/v1/Web?Query=";
  var formattedQuery = "%27" + encodeURIComponent(query) + "%27";
  var jsonFormat = "&$format=json";
  var queryUri = baseQueryUri + formattedQuery + jsonFormat;
  var authToken = new Buffer(":" + key).toString('base64');
  
  console.log(formattedQuery);
  var options = {
    url: queryUri,
    headers: {
      "Authorization": "Basic " + authToken
    }
  };

  request.get(options,callback);
}

module.exports.find = find;