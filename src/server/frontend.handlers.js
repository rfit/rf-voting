module.exports.indexHandler = function* () {
  yield this.render('index')
}

module.exports.projectHandler = function* () {
  this.body = require('./testSet1.json')
}
