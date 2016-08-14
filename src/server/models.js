const mongoose = require('mongoose')

module.exports = function Models() {
  const Poll = mongoose.model('Poll', {name: String})
  
  return {
    Poll
  }
}
