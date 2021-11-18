module.exports = (server) => {
    const io = require('socket.io')(server)
    const messenger = io.of('/messenger')

    require('../sockets/online')(io)
    require('../sockets/messanger')(messenger)
}