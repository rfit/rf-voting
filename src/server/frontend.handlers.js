module.exports.indexHandler = function* () {
  let indexData = {
    'howtoread': "thispropertyintemplate"
  }
  if (require('config').get('serverMode') === 'production' ) {
    yield this.render('index', indexData) // TODO figure out why not working in template and we have to use this current solution..
  } else {
    yield this.render('index-dev')
  }

}

module.exports.projectHandler = function* () {
  let set = yield require('./projects.json')
  this.body = set
}
