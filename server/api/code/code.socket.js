/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Code = require('./code.model');

exports.register = function(socket) {
  Code.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Code.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('code:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('code:remove', doc);
}