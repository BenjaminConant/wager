exports.helpMessage = function() {
	return "Wager Help Menu:\n#help - gets you the help menu\n\n#findbets - lists all the bets you can take\n\n#makebet - write a bet you want to make use $20 in the bet to sat for twenty dollars\n\n#takebet - take a bet that you found using findbets inlude the bet number after #takebet \n\n#profile - get your profile info\n\n#standings - get the standings for the leagues your in\n\nanything else - gets you an i dident get that and then the help menu'";
} 



exports.didNotGetThat = function (text) {
	return 'Hey,\n\nI did not understand your last message of "' + text + '". Have a look at the help menu! \n\n ----------- \n\n' + exports.helpMessage();
}

exports.listBets = function(bets) {
	var text = '';
	bets.forEach(function(bet, index){
		if (bet.maker){
			bet.content.trim()
			text += bet.maker.name + ': ' + '' + bet.content + '\n' + 'text( #takebet ' +bet.responseCode.code + ' ) to take the bet \n \n';
		}
	})
	text = text.trim()
	return text;
}

exports.betCreated = function() {
	return "Your bet has been created ... text #findbets to see it!";
}

exports.notImplementedYet = function (){
	return "Sorry, we dont have that feature yet \n:(";
}

exports.tookBet = function() {
	return "You have taken the bet .... expect a text from us when it is settled"
}

exports.userProfile = function(profile) {
	return profile.toString();
}

exports.error = function (err){
	return "This is akward ... looks like we got and error" + err;
}