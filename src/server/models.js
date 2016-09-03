const mongoose = require('mongoose')

module.exports = function Models() {
  const schema = {
    name: String,
    votes: Number
  }
  const Poll = mongoose.model('Poll', schema)

  return {
    Poll
  }
}
