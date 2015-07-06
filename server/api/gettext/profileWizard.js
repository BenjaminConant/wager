var Controller = require('./gettext.controller');
var Messages = require('./messages.js');
var User = require('../user/user.model.js');

exports.getProfile = function (textData, res) {
	 User.find({phoneNumber: textData.From}, '-salt -hashedPassword').exec()
	 .then(function(user){
	 	console.log("got the user", user);
	 	Controller.respond(Messages.userProfile(user), res)
	 })
	 .then(null, function(err){
	 	console.log("err from profile Wizard get Profile", err);
	 	Controller.respond(Messages.error(err), res);
	 })
}