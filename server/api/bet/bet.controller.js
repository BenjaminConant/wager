'use strict';

var _ = require('lodash');
var Bet = require('./bet.model');


// Get list of bets
exports.index = function(req, res) {
  Bet.find({}).deepPopulate('maker taker winner').exec()
  .then(function(bets){
    bets.forEach(function(bet){
      bet.maker.hashedPassword = null;
      bet.maker.salt = null;
      if (bet.taker) {
        bet.taker.hashedPassword = null;
        bet.taker.salt = null;
      }
      if (bet.winner) {
        bet.taker.winner = null;
        bet.taker.winner = null;
      }
      console.log(bet);
    })
    console.log(bets);
    res.json(200, bets);
  })
  .then(null, function(err){
    console.log("delegator findBets", err);
  })
};

// Get a single bet
exports.show = function(req, res) {
  Bet.findById(req.params.id, function (err, bet) {
    if(err) { return handleError(res, err); }
    if(!bet) { return res.send(404); }
    return res.json(bet);
  });
};

// Creates a new bet in the DB.
exports.create = function(req, res) {
  Bet.create(req.body, function(err, bet) {
    if(err) { return handleError(res, err); }
    return res.json(201, bet);
  });
};

// Updates an existing bet in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bet.findById(req.params.id, function (err, bet) {
    if (err) { return handleError(res, err); }
    if(!bet) { return res.send(404); }
    var updated = _.merge(bet, req.body);
    updated.save(function (err, u) {
      if (err) { return handleError(res, err); }
      Bet.find({_id: u._id}).deepPopulate('maker taker winner').exec()
      .then(function(betArray){
        console.log("populated bet", betArray)
        return res.json(200, betArray[0]);
      })
      .then(null, function(err){
        if (err) { return handleError(res, err); }
      })
    });
  });
};

// Deletes a bet from the DB.
exports.destroy = function(req, res) {
  Bet.findById(req.params.id, function (err, bet) {
    if(err) { return handleError(res, err); }
    if(!bet) { return res.send(404); }
    bet.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log("this is the error", err);
  return res.send(500, err);
}