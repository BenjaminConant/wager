'use strict';

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Promise = require('bluebird');
Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;


var BetSchema = new Schema({
  content: String,
  amount: Number,
  maker: {type: Schema.Types.ObjectId, ref: 'User'},
  taker: {type: Schema.Types.ObjectId, ref: 'User'},
  winner: {type: Schema.Types.ObjectId, ref: 'User'},
  settled: Boolean, 
  message: String,
  dateCreated: Date,
  dateTaken: Date,
  dateSettled: Date,
  responseCode: {type: Schema.Types.ObjectId, ref: 'Code'}
});

BetSchema.plugin(deepPopulate);

module.exports = mongoose.model('Bet', BetSchema);


// id: MongooseShemaType.ObjectId,
// content: String,
// amount: Number,
// maker: MongooseSchemaType.ObjectId.ref(‘user’),
// taker:  MongooseSchemaType.ObjectId.ref(‘user’),
// winner: Enum[‘maker’, ‘taker’, ‘none’]
// dateCreated: Date,
// dateTaken: Date,
// dateSettled: Date,
// responseNumber: Number, 
