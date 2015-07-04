'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LeagueSchema = new Schema({
  name: String,
  joinCode: String
});

module.exports = mongoose.model('League', LeagueSchema);