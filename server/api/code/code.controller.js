'use strict';

var _ = require('lodash');
var Code = require('./code.model');

// Get list of codes
exports.index = function(req, res) {
  Code.find(function (err, codes) {
    if(err) { return handleError(res, err); }
    return res.json(200, codes);
  });
};

// Get a single code
exports.show = function(req, res) {
  Code.findById(req.params.id, function (err, code) {
    if(err) { return handleError(res, err); }
    if(!code) { return res.send(404); }
    return res.json(code);
  });
};

// Creates a new code in the DB.
exports.create = function(req, res) {
  Code.create(req.body, function(err, code) {
    if(err) { return handleError(res, err); }
    return res.json(201, code);
  });
};

// Updates an existing code in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Code.findById(req.params.id, function (err, code) {
    if (err) { return handleError(res, err); }
    if(!code) { return res.send(404); }
    var updated = _.merge(code, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, code);
    });
  });
};

// Deletes a code from the DB.
exports.destroy = function(req, res) {
  Code.findById(req.params.id, function (err, code) {
    if(err) { return handleError(res, err); }
    if(!code) { return res.send(404); }
    code.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}