var modelPattern = require('../modelPattern');
var addressEndings = [ 'strt', 'street', 'st', 'blvd', 'bulevard' ]

var geocoderProvider = 'google';
var httpAdapter = 'https';
var extra = {
   formatter: null
 };

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);


function format (model, callback) {

  var offset = 0;

  var matched = false;
  var anyMatched = false;
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
  offset = 0;
  modelPattern.match(model,[
    {word : 'go'},
    {word : 'to'},
    {type : 'NN'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 3;
    for (i = next; i < model.length; i++){ 
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria ' + model.slice(next-1, i).map(function(n){
            return n[0];
          }).join(' ');
          addressEndings.forEach(function(ending){
            address = address.replace(ending, '');
          });
          (function(iIdx,iI){
            geocoder.geocode(address, function(err, data){
              if(!matched){
                matched = true;
                offset -= 1;
                model.splice(iIdx+1, iI-iIdx-1, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
          })(idx,i);
          break;
        }
      }
    }
  });


  offset = 0;
  modelPattern.match(model,[
    {word : 'go'},
    {word : 'to'},
    {type : 'NNP'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 3;
    for (i = next; i < model.length; i++){ 
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria ' + model.slice(next-1, i).map(function(n){
            return n[0];
          }).join(' ');
          addressEndings.forEach(function(ending){
            address = address.replace(ending, '');
          });
          (function(iIdx,iI){
            geocoder.geocode(address, function(err, data){
              if(!matched){
                matched = true;
                offset -= 1;
                model.splice(iIdx+1, iI-iIdx-1, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
          })(idx,i);
          break;
        }
      }
    }
  });
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {word : 'the'},
    {regex : /end|beginning|start/},
    {word : 'of'},
    {type : 'NN'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 5;
    for (i = next; i < model.length; i++){ 
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria ' + model.slice(next-1, i).map(function(n){
            return n[0];
          }).join(' ');
          addressEndings.forEach(function(ending){
            address = address.replace(ending, '');
          });
          (function(iIdx,iI){
            geocoder.geocode(address, function(err, data){
              if(!matched){
                matched = true;
                offset -= 2;
                model.splice(iIdx, iI-iIdx, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
          })(idx,i);
          break;
        }
      }
    }
  });

  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {word : 'the'},
    {regex : /end|beginning|start/},
    {word : 'of'},
    {type : 'NNP'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 5;
    for (i = next; i < model.length; i++){ 
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria ' + model.slice(next-1, i).map(function(n){
            return n[0];
          }).join(' ');
          addressEndings.forEach(function(ending){
            address = address.replace(ending, '');
          });
          (function(iIdx,iI){
            geocoder.geocode(address, function(err, data){
              if(!matched){
                matched = true;
                offset -= 2;
                model.splice(iIdx, iI-iIdx, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
          })(idx,i);
          break;
        }
      }
    }
  });


//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {word : 'the'},
    {regex : /intersection|corner/},
    {word : 'of'},
    {type : 'NN'},
  ]).forEach(function(idx){
      idx += offset;
      var next = idx + 5;
      var firstAddressString,secondAddressString;
      var foundFirst = false;
      var foundSecond = false;
      var i1,j1;
      for(var i = next; i < model.length; i++){
        if(model[i][0] == 'and'){
          //build string
          firstAddressString = model.slice(next,i).map(function(part){
            return part[0];
          }).join(' ');
          next = i + 1;
          foundFirst = true;
          i1 = i;
          break;
        }
      }
      for(var i = next; i < model.length; i++){
        if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ) {
          secondAddressString = model.slice(next,i).map(function(part){
            return part[0];
          }).join(' ');
          foundSecond = true;
          j1 = i;
          break;
        }
      }
      var megaString = model.slice(idx + 1, j1).map(function(part){
        return part[0];
      }).join(' ');
      addressEndings.forEach(function(ending){
        megaString = megaString.replace(ending, '');
      });
      if(foundFirst && foundSecond) {
        anyMatched = true;
        (function(iIdx,iI){
            geocoder.geocode(megaString, function(err, data){
              if(!matched){
                matched = true;
                offset -= 2;
                model.splice(iIdx, iI-iIdx, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
        })(idx + 1, j1);
      }
    });

////////////FIXEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD

  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {word : 'the'},
    {regex : /intersection|corner/},
    {word : 'of'},
    {type : 'NNP'},
  ]).forEach(function(idx){
      idx += offset;
      var next = idx + 5;
      var firstAddressString,secondAddressString;
      var foundFirst = false;
      var foundSecond = false;
      var i1,j1;
      for(var i = next; i < model.length; i++){
        if(model[i][0] == 'and'){
          //build string
          firstAddressString = model.slice(next,i);
          firstAddressString = firstAddressString.map(function(part){
            return part[0];
          });
          firstAddressString = firstAddressString.join(' ');
          next = i + 1;
          foundFirst = true;
          i1 = i;
          break;
        }
      }
      for(var i = next; i < model.length; i++){
        if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ) {
          secondAddressString = model.slice(next,i).map(function(part){
            return part[0];
          }).join(' ');
          addressEndings.forEach(function(ending){
            address = address.replace(ending, '');
          });
          foundSecond = true;
          j1 = i;
          break;
        }
      }
      var megaString = model.slice(idx + 1, j1).map(function(part){
        return part[0];
      }).join(' ');
      addressEndings.forEach(function(ending){
        megaString = megaString.replace(ending, '');
      });
      if(foundFirst && foundSecond) {
        anyMatched = true;
        (function(iIdx,iI){
            geocoder.geocode(megaString, function(err, data){
              if(!matched){
                matched = true;
                offset -= 2;
                model.splice(iIdx, iI-iIdx, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
        })(idx + 1, j1);
      }
    });



//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
  offset = 0;
  modelPattern.match(model,[
    {word : 'in'},
    {word : 'the'},
    {word : 'middle'},
    {word : 'of'},
    {type : 'NN'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 5;
    for (i = next; i < model.length; i++){
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria ' + model.slice(next-1, i).map(function(n){
            return n[0];
          }).join(' ');
          addressEndings.forEach(function(ending){
            address = address.replace(ending, '');
          });
          (function(iIdx,iI){
            geocoder.geocode(address, function(err, data){
              if(!matched){
                matched = true;
                offset -= 2;
                model.splice(iIdx, iI-iIdx, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
          })(idx,i);
          break;
        }
      }
    }
  });

  offset = 0;
  modelPattern.match(model,[
    {word : 'in'},
    {word : 'the'},
    {word : 'middle'},
    {word : 'of'},
    {type : 'NNP'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 5;
    for (i = next; i < model.length; i++){ 
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria ' + model.slice(next-1, i).map(function(n){
            return n[0];
          }).join(' ');
          addressEndings.forEach(function(ending){
            address = address.replace(ending, '');
          });
          (function(iIdx,iI){
            geocoder.geocode(address, function(err, data){
              if(!matched){
                matched = true;
                offset -= 2;
                model.splice(iIdx, iI-iIdx, [ JSON.stringify(data) , 'Address' ]);
                callback(model);
              }
            })
          })(idx,i);
          break;
        }
      }
    }
  });

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------


  if(!anyMatched){
    callback(model);
  }
}

module.exports.format = format;

