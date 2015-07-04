var words = require('./words');

exports.isHelp = function(text) {
	return words.helpWords[text];
}

exports.isFindBets = function(text) {
	return text === '#findbets';
}

exports.isMakeBet = function(text) { 
	return firstWord(text) === '#makebet';
}

exports.isTakeBet = function(text) { 
	return firstWord(text) === '#takebet';
}

exports.isProfile = function(text) { 
	return firstWord(text) === '#profile';
}

exports.isStandings = function(text) { 
	return firstWord(text) === '#standings';
}



function firstWord (text) {
	return text.split(' ')[0];
}
