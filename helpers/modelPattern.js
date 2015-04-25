function matchSingle(token, patternPart){
  if(patternPart.word && typeof(token[0]) == "String"){
    if(token[0].toLowerCase() != patternPart.word.toLowerCase()) return false;
  }
  if(patternPart.type){
    if(token[1] != patternPart.type) return false;
  }
  if(patternPart.regex){
    if(!patternPart.regex.test(token[0]))return false;
  }
  return true;
}

function matchFromIndex(model,index,pattern) {
  if(model.length - 1 - index < pattern.length - 1) return false;
  for(var i = index; i < index + pattern.length; i++){
    if(!matchSingle(model[i], pattern[i - index])){
      return false;
    }
  }
  return true;
}

function match (model, pattern){
  var matchLocations = [];
  for(var i = 0; i < model.length - pattern.length + 1; i++){
    console.log(i);
    if(matchFromIndex(model,i,pattern)){
      matchLocations.push(i);
      i += pattern.length;
    }
  }
  return matchLocations;
}

module.exports.match = match;