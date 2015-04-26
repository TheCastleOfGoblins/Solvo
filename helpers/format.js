var formattingPipeline = require('../helpers/formattingPipeline');
var regexAddressFormatter = require("../helpers/formatters/regexAddress");
var relativeAddressFormatter = require("../helpers/formatters/relativeAddress");
var baseTimeFormatter = require("../helpers/formatters/baseTimeFormater");
var weekdayFormatter = require("../helpers/formatters/weekdayFormatter");
var dateFormatter = require("../helpers/formatters/dateFormatter");
var dateTimeFormatter = require("../helpers/formatters/dateTimeFormatter");
var addressFormatter = require("../helpers/formatters/addressFormatter");
var atAddressFormatter = require("../helpers/formatters/atAddressFormatter");
var contactFormater = require('../helpers/formatters/contactFormater');
var searchFormatter = require('../helpers/formatters/searchFormatter');

var formatterArray = [
  weekdayFormatter,
  baseTimeFormatter,
  dateFormatter,
  dateTimeFormatter,
  addressFormatter,
  atAddressFormatter, 
  contactFormater, 
  searchFormatter
];

function run(model, callback){
  formattingPipeline.format(model,formatterArray,callback);
}

module.exports.run = run;