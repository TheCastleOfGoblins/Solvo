function syntaxAnalysis (stringForAnalysis) {
  
	var pos = require('pos');
  var rawString = stringForAnalysis[0].toLowerCase() + stringForAnalysis.substring(1,stringForAnalysis.length);
	var words = new pos.Lexer().lex(rawString);
	var taggedWords = new pos.Tagger().tag(words);
  taggedWords.raw = stringForAnalysis;
	return taggedWords;  
}

module.exports.syntaxAnalysis = syntaxAnalysis;