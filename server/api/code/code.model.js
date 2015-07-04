'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CodeSchema = new Schema({
  code: String,
  bet: {type: Schema.Types.ObjectId, ref:'Bet'},
  userName: String, 
  codeNumber: Number,
});

module.exports = mongoose.model('Code', CodeSchema);