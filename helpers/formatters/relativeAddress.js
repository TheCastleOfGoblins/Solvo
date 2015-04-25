function format (model, callback) {
  request('ggggg',function(data){
    model = data;
    callback(model);
  })
  
}

module.exports.format = format;