var modelPattern = require('../modelPattern');
var daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function format (model, callback) {
  console.log("weekdayFormatter for : '" + model.raw + "'");
  modelPattern.match(model,[
    {options : daysOfWeek},
  ]).forEach(function(idx){
    var day = daysOfWeek.indexOf(model[idx][0]) + 1;
    model.splice(idx, 1, [ day , 'DayOfWeek' ]);
  });
  
  callback(model);
}

module.exports.format = format;