/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Gettext = require('./gettext.model');

exports.register = function(socket) {
  Gettext.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Gettext.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('gettext:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('gettext:remove', doc);
}