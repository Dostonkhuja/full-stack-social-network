const app = require('express')()
const server = require('http').createServer(app)
const winston = require('winston')
require('dotenv').config()

require('./startUp/io')(server)
require('./startUp/routes')(app)
require('./startUp/db')()
require('./startUp/logging')()
require('./startUp/config')()

const port = process.env.PORT || 5000
server.listen(port, () => winston.debug(`${port} port listening...`))