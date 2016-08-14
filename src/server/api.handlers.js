/**
 * @file: This file contains route handlers.
 */

module.exports.indexHandler = function * indexHandler () {
  this.body = {msg: 'hey you! this is a private area!'}
}
