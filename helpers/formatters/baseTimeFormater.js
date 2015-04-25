var modelPattern = require('../modelPattern');

function format (model, callback) {
  console.log("baseTimeFormatter for : '" + model.raw + "'");
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
    model.splice(idx + 1, 4, [ time , 'Time' ]);
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
    model.splice(idx + 1, 3, [ time , 'Time' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'CD'},
    {word : ':'},
    {type : 'CD'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var time = {
      hour : parseInt(model[idx+1][0]),
      minute : parseInt(model[idx+3][0])
    };
    model.splice(idx + 1, 3, [ time , 'Time' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'CD'},
    {regex : /am|AM|pm|PM/},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 1;
    var time = {
      hour : parseInt(model[idx+1][0]) + (/pm|PM/.test(model[idx+2][0]) ? 12 : 0),
      minute : 0
    };
    model.splice(idx + 1, 2, [ time , 'Time' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {type : 'CD'},
    {word : ':'},
    {type : 'CD'},
    {regex : /am|AM|pm|PM/},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 3;
    var time = {
      hour : parseInt(model[idx][0]) + (/pm|PM/.test(model[idx+3][0]) ? 12 : 0),
      minute : parseInt(model[idx+2][0])
    };
    model.splice(idx , 4, [ time , 'Time' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {type : 'CD'},
    {type : 'CD'},
    {regex : /am|AM|pm|PM/},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var time = {
      hour : parseInt(model[idx][0]) + (/pm|PM/.test(model[idx+2][0]) ? 12 : 0),
      minute : parseInt(model[idx+1][0])
    };
    model.splice(idx , 3, [ time , 'Time' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {type : 'CD'},
    {word : ':'},
    {type : 'CD'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var time = {
      hour : parseInt(model[idx][0]),
      minute : parseInt(model[idx+2][0])
    };
    console.write(model[idx+2][0]);
    model.splice(idx , 3, [ time , 'Time' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'CD'},
    {type : 'CD'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 1;
    var time = {
      hour : parseInt(model[idx+1][0]),
      minute : parseInt(model[idx+2][0])
    };
    model.splice(idx + 1, 2, [ time , 'Time' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {type : 'CD'},
    {type : 'CD'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 1;
    var time = {
      hour : parseInt(model[idx][0]),
      minute : parseInt(model[idx+1][0])
    };
    model.splice(idx , 2, [ time , 'Time' ]);
  });
  
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'CD'},
  ]).forEach(function(idx){
    var f = parseFloat(model[idx+1][0]);
    var i = parseInt(model[idx+1][0]);
    var time = {
      hour : i,
      minute : Math.floor((f - i) * 100)
    };
    model.splice(idx + 1, 1, [ time , 'Time' ]);
  });
  
  callback(model);
}

module.exports.format = format;