var modelPattern = require('../modelPattern');
var months = ["January","February","March","April","May","June","July","August","September","October","November","December",
              "Jan"    ,"Feb"     ,"Mar"  ,"Apr"  ,"May","Jun" ,"Jul" ,"Aug"   ,"Sep"      ,"Oct"    ,"Nov"     ,"Dec",
              "1"      ,"2"       ,"3"    ,"4"    ,"5"  ,"6"   ,"7"   ,"8"     ,"9"        ,"10"     ,"11"      ,"12" ,
              "01"      ,"02"       ,"03"    ,"04"    ,"05"  ,"06"   ,"07"   ,"08"     ,"09"        ,"10"     ,"11"      ,"12" ];

function format (model, callback) {
  console.log("dateFormatter for : '" + model.raw + "'");

  var offset = 0;
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {type : 'CD'},
    {regex : /,|\/|;|-/},
    {options : months},
    {regex : /,|\/|;|-/},
    {type : 'CD'}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 4;
    var day = parseInt(model[idx+1][0]);
    var year = parseInt(model[idx+5][0]);
    if(day > 1000){
      var tmp = year;
      year = day;
      day = tmp;
    }
    var date = {
      day : day,
      month : months.indexOf(model[idx+3][0]) % 12,
      year : year
    };
    model.splice(idx + 1, 5, [ date , 'Date' ]);
  });
  
    
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {options : months},
    {regex : /,|\/|;|-/},
    {type : 'CD'},
    {regex : /,|\/|;|-/},
    {type : 'CD'}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 4;
    var day = parseInt(model[idx+3][0]);
    var year = parseInt(model[idx+5][0]);
    if(day > 1000){
      var tmp = year;
      year = day;
      day = tmp;
    }
    var date = {
      day : day,
      month : months.indexOf(model[idx+1][0]) % 12,
      year : year
    };
    model.splice(idx + 1, 5, [ date , 'Date' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {options : months},
    {type : 'CD'},
    {type : 'CD'}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var day = parseInt(model[idx+2][0]);
    var year = parseInt(model[idx+5][0]);
    if(day > 1000){
      var tmp = year;
      year = day;
      day = tmp;
    }
    var date = {
      day : day,
      month : months.indexOf(model[idx+1][0]) % 12,
      year : year
    };
    model.splice(idx + 1, 3, [ date , 'Date' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {type : 'CD'},
    {options : months},
    {type : 'CD'}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var day = parseInt(model[idx+1][0]);
    var year = parseInt(model[idx+3][0]);
    if(day > 1000){
      var tmp = year;
      year = day;
      day = tmp;
    }
    var date = {
      day : day,
      month : months.indexOf(model[idx+2][0]) % 12,
      year : year
    };
    model.splice(idx + 1, 3, [ date , 'Date' ]);
  });
  
  //---
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {type : 'CD'},
    {regex : /,|\/|;|-/},
    {options : months},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var day = parseInt(model[idx+1][0]);
    var date = {
      day : day,
      month : months.indexOf(model[idx+3][0]) % 12,
      year : new Date().getFullYear()
    };
    model.splice(idx + 1, 3, [ date , 'Date' ]);
  });
  
    
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {options : months},
    {regex : /,|\/|;|-/},
    {type : 'CD'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var day = parseInt(model[idx+3][0]);
    var date = {
      day : day,
      month : months.indexOf(model[idx+1][0]) % 12,
      year : new Date().getFullYear()
    };
    model.splice(idx + 1, 3, [ date , 'Date' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {options : months},
    {type : 'CD'},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 1;
    var day = parseInt(model[idx+2][0]);

    var date = {
      day : day,
      month : months.indexOf(model[idx+1][0]) % 12,
      year : new Date().getFullYear()
    };
    model.splice(idx + 1, 2, [ date , 'Date' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'on'},
    {type : 'CD'},
    {options : months},
  ]).forEach(function(idx){
    idx += offset;
    offset -= 1;
    var day = parseInt(model[idx+1][0]);

    var date = {
      day : day,
      month : months.indexOf(model[idx+2][0]) % 12,
      year : new Date().getFullYear()
    };
    model.splice(idx + 1, 2, [ date , 'Date' ]);
  });
  //---
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'in'},
    {options : months},
    {regex : /,|\/|;|-/},
    {type : 'CD'}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var date = {
      day : 1,
      month : months.indexOf(model[idx+1][0]) % 12,
      year : parseInt(model[idx+3][0])
    };
    model.splice(idx + 1, 3, [ date , 'Date' ]);
  });

  offset = 0;
  modelPattern.match(model,[
    {word : 'in'},
    {type : 'CD'},
    {regex : /,|\/|;|-/},
    {options : months}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 2;
    var date = {
      day : 1,
      month : months.indexOf(model[idx+3][0]) % 12,
      year : parseInt(model[idx+1][0])
    };
    model.splice(idx + 1, 3, [ date , 'Date' ]);
  });
  
  offset = 0;
  modelPattern.match(model,[
    {word : 'in'},
    {options : months},
    {type : 'CD'}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 1;
    var date = {
      day : 1,
      month : months.indexOf(model[idx+1][0]) % 12,
      year : parseInt(model[idx+2][0])
    };
    model.splice(idx + 1, 2, [ date , 'Date' ]);
  });

  offset = 0;
  modelPattern.match(model,[
    {word : 'in'},
    {type : 'CD'},
    {options : months}
  ]).forEach(function(idx){
    idx += offset;
    offset -= 1;
    var date = {
      day : 1,
      month : months.indexOf(model[idx+2][0]) % 12,
      year : parseInt(model[idx+1][0])
    };
    model.splice(idx + 1, 2, [ date , 'Date' ]);
  });
  
  modelPattern.match(model,[
    {word : 'in'},
    {options : months},
  ]).forEach(function(idx){
    var date = {
      day : 1,
      month : months.indexOf(model[idx+1][0]) % 12,
      year : new Date().getFullYear()
    };
    model.splice(idx + 1, 1, [ date , 'Date' ]);
  });
  
  modelPattern.match(model,[
    {word : 'in'},
    {type : 'CD'},
  ]).forEach(function(idx){
    var date = {
      day : 1,
      month : 1,
      year : parseInt(model[idx+1][0])
    };
    model.splice(idx + 1, 1, [ date , 'Date' ]);
  });
  
  callback(model);
}

module.exports.format = format;


/*datetime = {
  time : {
    hour : 10,
    minute : 33
  },
  date :{
    day : 1,
    month : 12,
    year : 2016
  }
}*/