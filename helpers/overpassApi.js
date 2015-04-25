function overpassApi (query, callback, options) {
	var overpass = require('query-overpass');

	console.log(overpass);

	overpass(query, callback, options);
}

module.exports.overpassApi = overpassApi;
