const {User} = require('../models/users')
const mongoose = require("mongoose");

module.exports = (io) => {
    let users = []
    io.on('connection', function(socket){
        socket.on('action', async (action) => {
            if(action.type === 'server/init'){
                if(action.payload.userId){
                    const isValidId = mongoose.Types.ObjectId.isValid(action.payload.userId)
                    if (isValidId){
                        await User.findByIdAndUpdate(action.payload.userId,{isOnline:true})
                        users.push({socketId:socket.id,userId: action.payload.userId})
                    }
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
            }
        })
    })
}