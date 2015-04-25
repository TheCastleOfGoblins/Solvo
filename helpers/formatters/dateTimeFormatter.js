var modelPattern = require('../modelPattern');
var daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function format (model, callback) {
  console.log("dateTimeFormatter for : '" + model.raw + "'");
  
  var offset = 0;
  modelPattern.match(model,[
    {regex : /on|in/},
    {type : 'Date'},
    {word : 'at'},
    {type : 'Time'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var dateTime = {
      date : model[idx+1][0],
      time : model[idx+3][0],
    };
    model.splice(idx + 1, 3, [ dateTime , 'DateTime' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'at'},
    {type : 'Time'},
    {regex : /on|in/},
    {type : 'Date'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var dateTime = {
      date : model[idx+1][0],
      time : model[idx+3][0],
    };
    model.splice(idx + 1, 3, [ dateTime , 'DateTime' ]);
  });
  
  modelPattern.match(model,[
    {type : 'Date'},
  ]).forEach(function(idx){
    var dateTime = {
      date : model[idx][0],
      time : undefined
    };
    model.splice(idx, 1, [ dateTime , 'DateTime' ]);
  });
  
  modelPattern.match(model,[
    {type : 'Time'},
  ]).forEach(function(idx){
    var dateTime = {
      date : {
        day : new Date().getDate(),
        month : new Date().getMonth() + 1,
        year : new Date().getFullYear()
      },
      time : model[idx][0],
    };
    model.splice(idx, 1, [ dateTime , 'DateTime' ]);
  });
  
  callback(model);
}

module.exports.format = format;