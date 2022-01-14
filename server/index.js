const express = require('express')
const app = express()
const server = require('http').createServer(app)
const winston = require('winston')
const path = require("path");
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'public')))

require('./startUp/prod')(app)
require('./startUp/io')(server)
require('./startUp/routes')(app)
require('./startUp/db')()
require('./startUp/logging')()
require('./startUp/config')()

const port = process.env.PORT || 5000
server.listen(port, () => winston.debug(`${port} port listening...`))