/**
 * @file: This is the main entry point for the API and backend.
 */

// Libraries
const koa = require('koa')
const route = require('koa-route')
const cors = require('koa-cors')
const views = require('koa-views')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const mongoose = require('mongoose')
const Models = require('./models')

// Handlers
const frontendHandlers = require('./frontend.handlers')
const apiHandlers = require('./api.handlers')

// Setup the databse
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/voting'
mongoose.connect(mongoUri)
const models = Models()

// setup the app
const app = koa()
const PORT = 3000

// Setup middlewares!
app.use(cors())
app.use(bodyParser())
app.use(serve(path.join(__dirname, '../../public'), {defer: true}))
app.use(views(path.join(__dirname, '../views'), {
  map: {
    html: 'nunjucks'
  }
}))
app.use(function * (next) {
  this.models = models
  yield next
})

// Define frontend routes
app.use(route.get('/', frontendHandlers.indexHandler))

// Define API routes
app.use(route.get('/api/', apiHandlers.indexHandler))
app.use(route.post('/api/submit', apiHandlers.submitHandler))

// Boot up the server!
app.listen(PORT, () => {
  console.log(`Started listening on ${PORT}`)
})
