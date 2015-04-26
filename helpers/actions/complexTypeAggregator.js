var modelPattern = require('../modelPattern');

function act (model, callback, finalCallback) {
  modelPattern.match(model,[
    {type : 'Address'},
  ]).forEach(function(i){
    model.response.addresses.push(model[i][0]);
  });
  
  modelPattern.match(model,[
    {type : 'Contacts'},
  ]).forEach(function(i){
    model.response.users.push(model[i][0]);
  });
  
  modelPattern.match(model,[
    {type : 'DateTime'},
  ]).forEach(function(i){
    model.response.dateTimes.push(model[i][0]);
  });
  
  model.response.searches.wiki = model.wiki;
  model.response.searches.google = model.google;
  model.response.searches.bing = model.bing;
  
  callback(model);
}

module.exports.act = act;