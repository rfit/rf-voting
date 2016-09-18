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

utilHandlers.connectToMongo() // Warning: Application stalls if not connected to mongo

// Start middleware handler (i.e. koa) - note that koa middleware is a generator function
const votingApp = koa()
votingApp.use(logger())

votingApp.use(serve(path.join(__dirname, '../../public'), { defer: true })) // Only files below this root are served
votingApp.use(views(path.join(__dirname, '../views')), {
    map: {
      html: 'nunjucks'
    },
    ext: '.html'
  }
) // Provides this.render

votingApp.use(betterBody()) // Provides this.body upstream

/* Non route specific middleware */
votingApp.use(utilHandlers.requestCounter)
votingApp.use(utilHandlers.ensureVoteTalliesExist)

/* Routes setup */
router.get('/', frontendHandlers.indexHandler)
router.get('/projects.json', frontendHandlers.projectHandler)

router.post('/api/vote.json', apiHandlers.voteHandler)
router.post('/api/login.json', apiHandlers.loginHandler)

votingApp.use(router.routes())
votingApp.use(router.allowedMethods())

votingApp.listen(require('config').get('requestPort'), utilHandlers.startUpHandler)
