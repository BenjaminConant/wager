/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 var mongoose = require('mongoose');
 var Promise = require('bluebird');
 Promise.promisifyAll(mongoose);

'use strict';

var User = require('../api/user/user.model');
var Bet = require('../api/bet/bet.model');
var Code = require('../api/code/code.model');
var League = require('../api/league/league.model');


var leagueId = '';
var userHash = {};
var bensBetId = '';
var harleysBetId = '';
League.find({}).remove().exec()
.then(function(){
  console.log("removed leages");  
  return User.find({}).remove().exec()
})
.then(function(){
  console.log("removed Users");  
  return Bet.find({}).remove().exec()
})
.then(function(){
  console.log("removed Bets");  
  return Code.find({}).remove().exec()
})
.then(function() {
  console.log("removed Codes");  
  return League.create({name: 'The League', joinCode: 'AAAA'})
})
.then(function(league){
  console.log("created league", league);  
  leagueId = league._id
  return User.create({
    provider: 'local',
    name: 'Ben',
    email: 'ben@ben.com',
    password: 'ben',
    leagues: [leagueId],
    phoneNumber: '+19175194215',
  })
})
.then(function(user){
  userHash[user.name] = user._id;
  console.log("created user ben", user);  
  return Bet.create({
    content: "I want the giants over the pats under 13 $100",
    amount: 100,
    maker: userHash['Ben'],
  })
})
.then(function(bet) {
  bensBetId = bet._id;
  console.log("created user bens bet", bet);
  return Code.create({
    code: 'Ben1',
    bet: bet._id,
    userName: 'Ben',
    codeNumber: 1
  })
})
.then(function(code){
  console.log("created bens bets code", code);
  console.log("code ID ", code._id);
  Bet.findById(bensBetId, function(err, bet){
    console.log(bet);
    bet.responseCode = code._id;
    bet.save();
  })
  return code;
})
.then(function(code){
  console.log("saved bensBet with code", code);
  return User.create({
    provider: 'local',
    name: 'Harley',
    email: 'harley@harley.com',
    password: 'harley',
    leagues: [leagueId],
    phoneNumber: '+16466414871',
  })
})
.then(function(user){
  console.log("created user harley", user);  
  userHash[user.name] = user._id;
  return Bet.create({
    content: "I knicks over the bulls over 12 $400",
    amount: 400,
    maker: userHash['Harley'],
  })
})
.then(function (bet) {
  harleysBetId = bet._id;
  console.log("created user harleys bet", bet);  
  return Code.create({
    code: 'Harley1',
    bet: bet._id,
    userName: 'Harley',
    codeNumber: 1
  })
})
.then(function(code){
  console.log("created user harleys bets code", code);
  Bet.findById(harleysBetId, function(err, bet){
    console.log(bet);
    bet.responseCode = code._id;
    bet.save();
  })
})
.then(function (bet) {
  console.log("created user harleys bet code", bet);  
})
.then(function(){
  User.create({
    provider: 'local',
    name: 'Harley',
    role: 'admin',
    email: 'nathanielharley@gmail.com',
    password: 'admin',
    phoneNumber: '+917'
  })
})
.then(null, function(err){
  console.log(err);
})



