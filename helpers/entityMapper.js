var amenities = require('../resources/amenity.json');
var shops = require('../resources/shop.json');
var openStreetMapsApi = require('./openStreetMapsApi');

function variations(type){
  if(type){
    type = type.toLowerCase();
    var result = [type];
    result.push(type + 's');
    if(type[type.length - 1] == 's'){
      result.push(type.split(0,type.length-2));
    }
    if(['a','e','o','u','i','y'].indexOf(type[type.length - 1]) >= 0){
      result.push(type.split(0,type.length-2) + 'ing');
    }
    else{
      result.push(type + 'ing');
    }
    return result;
  } 
  else {
    return type;
  }
}

function shop(type) {
  var vrs = variations(type);
  if(!vrs) return undefined;
  var result;
  vrs.reverse().forEach(function(v){
    if(shops[v])result = v;
  });
  return result;
}

function amenity(type) {
  var vrs = variations(type);
  var result;
  vrs.reverse().forEach(function(v){
    if(amenities[v])result = v;
  });
  return result;
}

function something(type){
  var s = shop(type);
  if(s){
    return {
      shop : s
    }
  }
  var a = amenity(type);
  if(a){
    return{
      amenity : a
    }
  }
  return undefined;
}

function mapShops(type,longtitude,latitude,callback){
  var s = shops[type];
  openStreetMapsApi.find("shop",s,longtitude,latitude,function(err,data){
    data.openStreetMapResultType = s;
    callback(err,data)
  });
}

function mapAmenity(type,longtitude,latitude,callback){
  var a = amenity[type];
  console.log(a);
  openStreetMapsApi.find("amenity",a,longtitude,latitude,function(err,data){
    data.openStreetMapResultType = a;
    callback(err,data)
  });
}

function mapSomething(type,longtitude,latitude,callback){
  var s = something(type);
  if(s.amenity){
    openStreetMapsApi.find("amenity",s.amenity,longtitude,latitude,function(err,data){
      data.openStreetMapResultType = s.amenity;
      callback(err,data)
    });
  }
  else if(s.shop){
    openStreetMapsApi.find("shop",s.shop,longtitude,latitude,function(err,data){
      data.openStreetMapResultType = s.shop;
      callback(err,data)
    });
  }
  else {
    callback("No data",{openStreetMapResultType:undefined});
  }
}

module.exports.shop = shop;
module.exports.amenity = amenity;
module.exports.something = something;
module.exports.mapShops = mapShops;
module.exports.mapAmenity = mapAmenity;
module.exports.mapSomething = mapSomething;