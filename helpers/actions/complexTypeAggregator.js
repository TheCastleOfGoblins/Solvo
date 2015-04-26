var modelPattern = require('../modelPattern');
var verbSynonims = require('../../resources/verb_synonyms.json');

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

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
  
  var verbs = modelPattern.match(model,[
    {typeList : ['VB','VBD','VBG','VBN','VBP','VBZ']},
  ]).map(function(idx){
    return model[idx][0];
  });
  
  var actionCandidates = [];
  
  if(verbs.length == 0){
    var words = verbs.filter(function(word){
      return typeof(word[0]) == 'string';
    }).map(function(w){
      return w[0];
    });
    
    for(var i = 0; i < words.length; i++){
      if(verbSynonims.synonyms[words[i]]){
        actionCandidates.push(words[i]);
      }
    }
  }
  else
  {
    actionCandidates = verbs.map(function(verb){
      return verbSynonims.synonyms[verb];
    }).filter(function(verb){
      return !!verb;
    });
  }
  
  actionCandidates.filter(onlyUnique);
  
  actionCandidates.onlyCandidate = actionCandidates.length == 1;
  
  model.actionCandidates = actionCandidates;
  
  callback(model);
}

module.exports.act = act;