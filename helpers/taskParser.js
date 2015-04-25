var pos = require('pos');
var moment = require('moment');

var words = new pos.Lexer().lex("Go to the gym in on Monday.");
var taggedWords = new pos.Tagger().tag(words);

console.log(parseTask('Go to Teathre Ivan Vazov with Yori.'));

function parseTask(string) {
  var task = {
    'action': '',
    'location': '',
    'datetime': '',
    'people': ''
  };

  var moments = ['today', 'tomorrow'];
  var personPrep = ['for', 'with'];
  var locationPrep = ['at', 'in', 'to'];
  var datetimePrep = ['next', 'in', 'after', 'at', 'on'];
  var preps = moments.concat(personPrep).concat(locationPrep).concat(datetimePrep);

  var words = string.split(" ");
  var currentField = 'action';
  for(var i = 0; i < words.length; i++) {
    if(isPerson(words[i], words[i + 1], personPrep)) {
      currentField = 'people';
      continue;
    } else if(isLocation(words[i], words[i + 1], locationPrep)) {
      currentField = 'location';
      continue;
    }

    task[currentField] += words[i] + ' ';
  }

  return task;
}

function isPerson(word, nextWord, preps) {
  if(preps.indexOf(word) != -1) {
    return nextWord[0] == nextWord[0].toUpperCase();
  }

  return false;
}

function isLocation(word, nextWord, preps) {
  if(preps.indexOf(word) != -1) {
    return nextWord[0] == nextWord[0].toUpperCase();
  }

  return false;
}
