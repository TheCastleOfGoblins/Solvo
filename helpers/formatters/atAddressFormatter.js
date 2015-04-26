var modelPattern = require('../modelPattern');
var addressEndings = [ 'strt', 'street', 'st', 'blvd' ]

var geocoderProvider = 'google';
var httpAdapter = 'https';
var extra = {
   formatter: null
 };

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);


function format (model, callback) {
  console.log("address Formatter for " + model.raw);

  var offset = 0;

  var matched = false;
  var anyMatched = false;

  offset = 0;
  modelPattern.match(model,[
    {regex : /on|at/},
    {type : 'NNP'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 3;
    for (i = next; i < model.length; i++){
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria Sofia ' + model.slice(next-1, i).map(function(n){
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
    {regex : /on|at/},
    {type : 'NN'},
  ]).forEach(function(idx){
    idx += offset;
    next = idx + 2;
    for (i = next; i < model.length; i++){
      if(model[i][1] != "NNP" && model[i][1] != "CD" && model[i][1] != "NN" ){
        if(typeof(model[i-1][0]) == "string" && ( addressEndings.indexOf(model[i-1][0]) > 0 || model[i-1][1] == "CD")){
          anyMatched = true;
          var address = 'Bulgaria Sofia ' + model.slice(next-1, i).map(function(n){
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

  if(!anyMatched){
    callback(model);
  }
}

module.exports.format = format;