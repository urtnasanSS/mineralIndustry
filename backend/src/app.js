const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const path = require('path')
const app = express()
var server = require('http').createServer(app)
app.use(function (req, res, next) {
  next()
})
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../uploads')))

console.log('tag', __dirname)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

require('./passport')
require('./routes')(app)
sequelize.sync({force: false})
  .then(() => {
    server.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
