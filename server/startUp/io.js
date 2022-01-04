module.exports = (server) => {
    const io = require('socket.io')(server)
    const messenger = io.of('/messenger')
    const guests = io.of('/guests')
    const chat = io.of('/chat')

    require('../sockets/online')(io)
    require('../sockets/guests')(guests)
    require('../sockets/chatsGroup')(chat)
    require('../sockets/messanger')(messenger)
}