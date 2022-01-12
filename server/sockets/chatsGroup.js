const ChatMessage = require('../models/chatMessages')

module.exports = (io) => {
    io.on('connection', function(socket){
        socket.on('action', async (action) => {
            if(action.type === 'chat/messages'){
                const chatMessages = await ChatMessage
                    .find()
                    .skip((action.payload.pageNumber-1) * action.payload.pageSize)
                    .limit(action.payload.pageSize)
                    .sort({createdAt:-1})
                    .populate('sender',{lastName:1,firstName:1,photos:1,isOnline:1})

               io.to(socket.id).emit('action',{type:'chat/getChatMessages',chatMessages})
            }
            if(action.type === 'chat/newMessage'){
                let newMessage = new ChatMessage(action.message)
                await newMessage.save()
                    newMessage = await ChatMessage.findById(newMessage._id).populate('sender',{lastName:1,firstName:1,photos:1,isOnline:1})
                io.emit('action',{type:'chat/getNewMessage',newMessage})
            }
        })
    })
}