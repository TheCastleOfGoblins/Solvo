function act (syntacticModel, actions, callback) {
  var current = function(dummy,cur,finalCallback){
    return function(model){
      cur(model);
    };
  }(0,callback,callback);
  actions.reverse(); 
  for(var i = 0; i < actions.length; i++){
    current = function(cur,actingFunction,finalCallback){
      return function(model){
        actingFunction(model, cur, finalCallback);
      };
    }(current,actions[i].act, callback);
  }
  current(syntacticModel);
  actions.reverse();
}

module.exports.act = act;