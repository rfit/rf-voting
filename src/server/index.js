/**
 * @file: This is the main entry point for the API and backend.
 */

const path = require('path')
const mongoose = require('mongoose')
var VoteTally = require('./models/VoteTally'); // For initial population of aggregated votes

// Setup
const PORT = 3000
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/voting'
mongoose.connect(mongoUri)

// Koa Libraries
const koa = require('koa')
const router = require('koa-router')()
const betterBody = require('koa-better-body')
const views = require('koa-views')
const serve = require('koa-static')

// Handlers
const frontendHandlers = require('./frontend.handlers')
const apiHandlers = require('./api.handlers')

// Start middleware handler
const votingApp = koa()

// Setup middlewares!
votingApp.use(serve(path.join(__dirname, '../../public'), {defer: true}))
votingApp.use(views(path.join(__dirname, '../views'), {
  map: {
    html: 'nunjucks'
  }
}))

votingApp.use(betterBody()) // Provides this.body

let reqStr = ''
let reqCount = 1
votingApp.use(function * (next) {
  this.reqCount = reqCount
  if (this.reqCount <= 1000 ) {
    let paddedStr = ("    " + this.reqCount).slice(-4); // See http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
    this.reqStr = ' ' + paddedStr + ' ' + this.request.url + ' | '
  } else {
    this.reqStr = ' ' + this.reqCount + ' ' + this.request.url + ' | '
  }
  console.log('-' + this.reqStr  + 'Start of chain')

  if (this.reqCount <= 1) {
    yield VoteTally.initializeTallies(this.reqStr)
  }
  yield next

  reqCount += 1
})

// Define frontend routes
router.get('/', frontendHandlers.indexHandler)
router.get('/projects.json', frontendHandlers.projectHandler)

// Define API routes
router.post('/api/vote.json', apiHandlers.voteHandler)
router.post('/api/login.json', apiHandlers.loginHandler)

votingApp.use(router.routes())
votingApp.use(router.allowedMethods());

// Boot up the server!
votingApp.listen(PORT, () => {
  console.log('.    0 [init] Started listening on ' + PORT)
})
