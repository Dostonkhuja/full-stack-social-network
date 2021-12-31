const {User} = require('../models/users')

module.exports = (io) => {
    let users = []
    io.on('connection', function(socket){
        socket.on('action', async (action) => {
            if(action.type === 'server/init'){
                if(action.data.userId){
                     await User.findByIdAndUpdate(action.data.userId,{isOnline:true})
                    users.push({socketId:socket.id,userId: action.data.userId})
                    // io.emit('action', {type:'online', data:users});
                }
            }

            if (action.type === 'server/forceDisconnect') {
                socket.disconnect()
            }
        })
        socket.on('disconnect', async () => {
            const user = users.find(u => u.socketId === socket.id)
            if(user){
            await User.findByIdAndUpdate(user.userId,{isOnline:false})
            users = users.filter(u => u.socketId !== socket.id)
            io.emit('action', {type:'online', data:users});
            }
        })
    })
}