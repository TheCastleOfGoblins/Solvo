function find (type, value, longtitude, latitude, callback) {
  var overpassUri = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];'
  var query;
  if(value){
    query = 'node(around:1000.0,' + longtitude + ',' + latitude + ')['+type+'='+value+'];out;';
  }
  else {
    query = 'node(around:1000.0,' + longtitude + ',' + latitude + ')['+type+'];out;';
  }
  var encodedQuery = encodeURIComponent(query);
  var address = overpassUri + query;
  console.log(address);
  var request = require("request");
  var options = {
    url: address,
  };
  request.get(options,callback);
}

module.exports.find = find;