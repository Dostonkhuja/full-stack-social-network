const express = require('express')
const cors = require('cors')
const errorMiddleware = require('../middleware/error')

module.exports = (app) => {
    app.use(cors({exposedHeaders: 'x-auth-token'}))
    app.use(express.json())


    app.use(errorMiddleware)
}