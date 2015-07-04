'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GettextSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Gettext', GettextSchema);