var actionPipeline = require('../helpers/actionPipeline');

var buy = require("../helpers/actions/buy");
var go = require("../helpers/actions/go");
var ask = require("../helpers/actions/ask");
var baseResponseSetup = require("../helpers/actions/baseResponseSetup");
var complexTypeAggregator = require("../helpers/actions/complexTypeAggregator");

var actionsArray = [
  baseResponseSetup,
  complexTypeAggregator,
  buy,
  go,
  ask
];

function run(model, callback){
  actionPipeline.act(model,actionsArray,callback);
}

module.exports.run = run;