/**
 * @file: This is the main entry point for the API and backend.
 */

const koa = require('koa')
const route = require('koa-route')
const cors = require('koa-cors')
const handlers = require('./handlers');

const app = koa()
const API_PORT = 3001

// Setup middlewares!
app.use(cors());

// Define routes
app.use(route.get('/', handlers.indexHandler))

// Boot up the server!
app.listen(API_PORT, () => {
  console.log(`Started listening on ${API_PORT}`)
})
