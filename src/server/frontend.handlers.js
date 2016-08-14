/**
 * @file: This file contains route handlers.
 */

module.exports.indexHandler = function * indexHandler () {
  yield this.render('index')
}
