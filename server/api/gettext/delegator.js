var Controller = require('./gettext.controller.js');
var Messages = require('./messages.js');
var textWizard = require('./textWizard.js');
var betWizard = require('./betWizard.js');
var profileWizard = require('./profileWizard.js');
var standingsWizard = require('./standingsWizard.js');
var twilio = require('twilio');

exports.delegate = function (textData, res) {
  var text = textData.Body;
  text = text.trim()
  if (textWizard.isHelp(text)) {
  	Controller.respond(Messages.helpMessage(), res);
  } else if (textWizard.isFindBets(text)) {
    betWizard.findBets(textData, res);
  } else if (textWizard.isMakeBet(text)) {
  	betWizard.makeBet(textData, res);
  } else if (textWizard.isTakeBet(text)) {
  	betWizard.takeBet(textData, res);
  } else if (textWizard.isProfile(text)) {
  	profileWizard.getProfile(textData, res);
  } else if (textWizard.isStandings(text)) {
  	standingsWizard.getStandings(textData, res);
  } else {
  	Controller.respond(Messages.didNotGetThat(text), res);
  }
}