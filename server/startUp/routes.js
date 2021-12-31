const express = require('express')
const cors = require('cors')
const errorMiddleware = require('../middleware/error')

module.exports = (app) => {
    app.use(cors({exposedHeaders: 'x-auth-token'}))
    app.use(express.urlencoded({limit: '50mb'}))
    app.use(express.json({limit: '50mb',extended:true}))
    app.use('/',require('../routes/main'))
    app.use('/api/auth',require('../routes/auth'))
    app.use('/api/profile',require('../routes/profile'))
    app.use('/api/follow',require('../routes/follow'))
    app.use('/api/users',require('../routes/users'))
    app.use('/api/myPhotos',require('../routes/myPhotos'))

    app.use(errorMiddleware)
}