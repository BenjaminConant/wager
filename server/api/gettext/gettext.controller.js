'use strict';

var _ = require('lodash');
var Gettext = require('./gettext.model');
var twilio = require('twilio');
var textWizard = require('./textWizard.js');
var betWizard = require('./betWizard.js');
var delegator = require('./delegator.js');

exports.receive = function(req, res) {
  delegator.delegate(req.query, res);    
};

exports.respond = function(message, res) {
  var twiml = new twilio.TwimlResponse();
  twiml.message(message);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}