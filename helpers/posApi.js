var pos = require('pos');
function syntaxAnalysis (stringForAnalysis) {
	var words = new pos.Lexer().lex(stringForAnalysis);
	var taggedWords = new pos.Tagger().tag(words);
	return taggedWords;
}