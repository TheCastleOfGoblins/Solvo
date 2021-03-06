var entityMapper = require("../entityMapper");
var modelPattern = require('../modelPattern');

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function act (model, callback, finalCallback) {
  var recognize = false;
  var objects = modelPattern.match(model,[
    {typeList : ['NN','NNP','NNPS','NNS']},
  ]).map(function(idx){
    return model[idx][0];
  });

  objects = objects.map(function(o){
    return entityMapper.shop(o);
  });

  objects = objects.filter(function(o){
    return !!o;
  });

  objects = objects.filter(onlyUnique);
  
  if(model.actionCandidates.indexOf('buy') < 0){
    callback(model);
    return;
  }
  
  recognize = objects.length > 0 || model.actionCandidates.onlyCandidate;
  
  var index = model.actionCandidates.indexOf('buy');

  if (index > -1) {
      model.actionCandidates.splice(index, 1);
  }

  if(recognize) {
    model.response.action = 'buy';
    if(objects.length > 0){
      var obj = objects[0];
      entityMapper.mapShops(obj, model.location.lat, model.location.lon, function(err, res){
        if(err){
          callback(model);
        }
        else {
          model.response.entities = JSON.parse(res.body).elements;
          finalCallback(model);
        }
      });
    }
    else if(model.actionCandidates.onlyCandidate) {
      entityMapper.mapShops(undefined, model.location.lat, model.location.lon, function(err, res){
        if(err){
          callback(model);
        }
        else {
          model.response.entities = JSON.parse(res.body).elements;
          finalCallback(model);
        }
      });
    }
    else {
      callback(model);
    }
  }
  else {
    callback(model);
  }
}

module.exports.act = act;