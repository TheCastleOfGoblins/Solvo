function format (syntacticModel, formaters, callback) {
  var current = function(dummy,cur){
    return function(model){
      cur(model);
    };
  }(0,callback);
  formaters.reverse(); 
  for(var i = 0; i < formaters.length; i++){
    current = function(cur,fromatingFunction){
      return function(model){
        fromatingFunction(model, cur);
      };
    }(current,formaters[i].format);
  }
  current(syntacticModel);
  formaters.reverse();
}

module.exports.format = format;