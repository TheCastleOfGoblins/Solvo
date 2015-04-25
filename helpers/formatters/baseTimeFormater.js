var modelPattern = require('../modelPattern');

function format (model, callback) {
  var offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'CD'},
    {word : ':'},
    {type : 'CD'},
    {regex : /am|AM|pm|PM/},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 3;
    var time = {
      hour : parseInt(model[idx+1][0]) + (/pm|PM/.test(model[idx+4][0]) ? 12 : 0),
      minute : parseInt(model[idx+3][0])
    };
    model.splice(idx + 1, 4, [ time , 'Date' ]);
  });
  
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'CD'},
    {type : 'CD'},
    {regex : /am|AM|pm|PM/},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var time = {
      hour : parseInt(model[idx+1][0]) + (/pm|PM/.test(model[idx+3][0]) ? 12 : 0),
      minute : parseInt(model[idx+2][0])
    };
    model.splice(idx + 1, 3, [ time , 'Date' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'CD'},
    {type : 'CD'},
    {regex : /am|AM|pm|PM/},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var time = {
      hour : parseInt(model[idx+1][0]) + (/pm|PM/.test(model[idx+3][0]) ? 12 : 0),
      minute : parseInt(model[idx+2][0])
    };
    model.splice(idx + 1, 3, [ time , 'Date' ]);
  });
  
  callback(model);
}

module.exports.format = format;