/**
 * @file: This is the main entry point for the API and backend.
 */

const path = require('path')

// Koa Libraries
const koa = require('koa')
const logger = require('koa-logger')
const router = require('koa-router')()
const betterBody = require('koa-better-body')
const views = require('koa-views')
const serve = require('koa-static')

// Handlers
const utilHandlers = require('./util.handlers')
const frontendHandlers = require('./frontend.handlers')
const apiHandlers = require('./api.handlers')

// Start middleware handler
const votingApp = koa()
votingApp.use(logger())

// Relevant for this.render it appears
votingApp.use(serve(path.join(__dirname, '../../public'), {defer: true}))
votingApp.use(views(path.join(__dirname, '../views'), {
  map: {
    html: 'nunjucks'
  }
}))

votingApp.use(utilHandlers.requestCounter)
votingApp.use(utilHandlers.ensureVoteTalliesExist)
votingApp.use(betterBody()) // Provides this.body

/* Routes for request base / */
router.get('/', frontendHandlers.indexHandler)
router.get('/projects.json', frontendHandlers.projectHandler)

/* Routes for api/ */
router.post('/api/vote.json', apiHandlers.voteHandler)
router.post('/api/login.json', apiHandlers.loginHandler)

votingApp.use(router.routes())
votingApp.use(router.allowedMethods())

votingApp.listen(require('config').get('requestPort'), utilHandlers.startUpHandler)
