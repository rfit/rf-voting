const {sprintf, vsprintf} = require("sprintf-js")
const mongoose = require('mongoose')
const config = require('config')
const VoteTally = require('./models/VoteTally')

module.exports.connectToMongo = function* () {
  yield mongoose.connect(require('config').get('mongoUri'))
}


let voteTalliesInitialized = false
module.exports.ensureVoteTalliesExist = function* (next) {
  if (!voteTalliesInitialized) {
    VoteTally.initializeTallies(this.reqStr)
    voteTalliesInitialized = true
  }
  if(!VoteTally.allTalliesExist()) {
    console.log("ERROR: Could not find all tallies. Restart this server to initialize with defaults or manually correct.")
    //TODO make check and throw 500 if non existing?
  } else {
    console.log("All tallies exist!")
  }
  yield next
}

let reqCount = 1
module.exports.requestCounter = function* (next) {
  if (reqCount % 50 === 0) {
    console.log(vsprintf(" *** %5d requests handled %s***", [reqCount, new Date().toString()]))
  }
  yield next
  reqCount += 1
}

module.exports.startUpHandler = function() {
  console.log(sprintf('  ***    Starting | %s | instance of rf-voting', config.util.getEnv('NODE_ENV') ))
  console.log(sprintf('  ***    Loaded configuration files from %s/*', config.util.getEnv('NODE_CONFIG_DIR') ))

  console.log(sprintf('  ***    Listening on port %d', config.get('requestPort')))
}
