/**
 * @file: This file contains route handlers.
 */

module.exports.indexHandler = function * indexHandler () {
  // (new this.models.Poll({name: 'hep'})).save()

  this.models.Poll.find((err, polls) => {
    this.body = {msg: 'hey you! this is a private area!', polls: polls.map(poll => poll.name)}
  })
}

module.exports.submitHandler = function * submitHandler () {
  console.log('Recieved Data:', this.request.body)
  this.body = {msg: 'Success'}
}
