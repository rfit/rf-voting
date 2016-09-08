const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userID: { type: String, required: true, unique: true },
  item1:  { type: String, required: true },
  item2:  { type: String, required: true },
  item3:  { type: String, required: true },
  location: String,
  created_at: Date,
  meta: {
    fbResponse: String
  },
});

let Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;
