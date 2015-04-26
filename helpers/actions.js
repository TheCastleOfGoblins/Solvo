var actionPipeline = require('../helpers/actionPipeline');

var buy = require("../helpers/actions/buy");
var baseResponseSetup = require("../helpers/actions/baseResponseSetup");
var complexTypeAggregator = require("../helpers/actions/complexTypeAggregator");

var actionsArray = [
  baseResponseSetup,
  complexTypeAggregator,
  buy
];

function run(model, callback){
  actionPipeline.act(model,actionsArray,callback);
}

module.exports.run = run;