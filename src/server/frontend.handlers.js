module.exports.indexHandler = function* () {
  yield this.render('index')
}

module.exports.projectHandler = function* () {
  const testSet1 = require('./testSet1.json');
  this.body = testSet1
}
