'use strict';

var _ = require('lodash');
var Bet = require('./bet.model');

// Get list of bets
exports.index = function(req, res) {
  Bet.find(function (err, bets) {
    if(err) { return handleError(res, err); }
    return res.json(200, bets);
  });
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
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, bet);
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
  return res.send(500, err);
}