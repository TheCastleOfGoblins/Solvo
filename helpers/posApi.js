function syntaxAnalysis (stringForAnalysis) {
	var pos = require('pos');
	var words = new pos.Lexer().lex(stringForAnalysis);
	var taggedWords = new pos.Tagger().tag(words);

	return taggedWords;  
}

module.exports.syntaxAnalysis = syntaxAnalysis;