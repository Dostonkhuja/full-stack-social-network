const app = require('express')()
require('dotenv').config()
const winston = require('winston')

require('./startUp/routes')(app)
require('./startUp/db')()
require('./startUp/logging')()
require('./startUp/config')()

const port = process.env.PORT || 5000
app.listen(port, () => winston.debug(`${port} port listening...`))