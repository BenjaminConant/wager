var User = require('../user/user.model');
var Bet = require('../bet/bet.model');
var Code = require('../code/code.model');
var Controller = require('./gettext.controller.js');
var Messages = require('./messages.js');


exports.findBets = function(textData, res) {
	Bet.find({}).deepPopulate('maker responseCode').exec()
	.then(function(bets){
		console.log(bets);
		text = Messages.listBets(bets);
		Controller.respond(text, res);
	})
	.then(null, function(err){
		console.log("delegator findBets", err);
	})
}

exports.makeBet = function(textData, res) {
	var userName,
		userId,
		codeId;
	
	User.findOne({phoneNumber: textData.From}).exec()
	.then(function(user){
		userId = user._id;
		userName = user.name;
		return Code.find({userName: user.name}).exec()
	})
	.then(function(codes){
		console.log(codes);		
		var sortCodes = codes.sort(function(a, b) {
   			return a.codeNumber - b.codeNumber;
		});
		var codeNumber = 1; 
		for (var i = 0; i < codes.length; i++) {
			if (codeNumber < codes[i]) {
				break;
			} else {
				codeNumber++; 
			}
		}
		var code = userName+codeNumber;
		return Code.create({
			code: code, 
			userName: userName,
			codeNumber: codeNumber,
		})
	})
	.then(function(code){
		codeId = code._id;
		return Bet.create({
			content: textData.Body,
			amount: 100,
			maker: userId,
			dateCreated: Date.now(),
			responseCode: codeId
		})
	})
	.then(function(bet){
		console.log(bet);
		Controller.respond(Messages.betCreated(), res);
	})
	.then(null, function(err){
		console.log(err);
		Controller.respond(Messages.error(err), res);
	})
};


exports.takeBet = function(textData, res) {


}

