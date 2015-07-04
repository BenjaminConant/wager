/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bet = require('./bet.model');

exports.register = function(socket) {
  Bet.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bet.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bet:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bet:remove', doc);
}