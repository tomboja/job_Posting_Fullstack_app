require('dotenv').config()

const express = require('express')

require('./api/data/db')
require('./api/data/jobs-model')
const routes = require('./api/routes')

const app = express()

app.use(function (req, res, next) {
  console.log('Req method: ' + req.method)
  console.log('Req url: ' + req.url)
  next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.header('Access-Control-Allow-Header', 'origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use('/api', routes)

const server = app.listen(process.env.PORT, function () {
  const port = server.address().port
  console.log('Server is listenign on post: ', port)
})
