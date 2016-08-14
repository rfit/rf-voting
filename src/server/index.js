/**
 * @file: This is the main entry point for the API and backend.
 */

// Libraries
const koa = require('koa')
const route = require('koa-route')
const cors = require('koa-cors')
const views = require('koa-views')
const serve = require('koa-static')
const path = require('path')

// Handlers
const frontendHandlers = require('./frontend.handlers')
const apiHandlers = require('./api.handlers')

const app = koa()
const PORT = 3000

// Setup middlewares!
app.use(cors())
app.use(serve(path.join(__dirname, '../../public'), {defer: true}))
app.use(views(path.join(__dirname, '../views'), {
  map: {
    html: 'nunjucks'
  }
}))

// Define frontend routes
app.use(route.get('/', frontendHandlers.indexHandler))

// Define API routes
app.use(route.get('/api/', apiHandlers.indexHandler))

// Boot up the server!
app.listen(PORT, () => {
  console.log(`Started listening on ${PORT}`)
})
