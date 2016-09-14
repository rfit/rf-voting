const {sprintf, vsprintf} = require("sprintf-js")
const mongoose = require('mongoose')
const config = require('config')
const VoteTally = require('./models/VoteTally')

module.exports.connectToMongo = function () {
  mongoose.connect(require('config').get('mongoUri'))
}

let voteTalliesInitialized = false
module.exports.ensureVoteTalliesExist = function* (next) {
  if (!voteTalliesInitialized) {
    yield VoteTally.initializeTallies()
    voteTalliesInitialized = true
  }
  if(!VoteTally.allTalliesExist()) {
    //TODO make check and throw 500 if non existing?
    this.status = 500
    console.log("ERROR: Could not find all tallies. Restart this server to initialize with defaults or manually correct.")
  } else {
    yield next
  }
}

let reqCount = 0
module.exports.requestCounter = function* (next) {
  if (reqCount % 50 === 0) {
    console.log(vsprintf(" *** %5d requests handled %s***", [reqCount, new Date().toString()]))
  }

  try { // TODO Figure out how to properly wrap and handle exceptions
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = err.message
    this.app.emit('error', err, this)
  }

  reqCount += 1
}

module.exports.startUpHandler = function() {
  console.log(sprintf('  ***    Starting | %s | instance of rf-voting', config.util.getEnv('NODE_ENV') ))
  console.log(sprintf('  ***    Loaded configuration files from %s/*', config.util.getEnv('NODE_CONFIG_DIR') ))

  console.log(sprintf('  ***    Listening on port %d', config.get('requestPort')))
}
