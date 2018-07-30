const mongoose = require('mongoose')
const Schema = mongoose.Schema; // Note the order
const Promise = require('bluebird');
Promise.promisifyAll(mongoose);

const VoteSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  item1: { type: String, required: true },
  item2: { type: String, required: true },
  item3: { type: String, required: true },
  location: String,
  created_at: Date,
  meta: {
    fbResponse: String
  },
});

let Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;
