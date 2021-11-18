const jwt = require('jsonwebtoken')

module.exports = function decoded(req, res, next) {
    const token = req.header('x-auth-token')
    if(token !== 'null') {
        let decoded = token ? jwt.verify(token, process.env.jwtPrivateKey) : ''
        req.user = decoded
    }
    next()
}