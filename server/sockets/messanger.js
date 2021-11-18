const Conversation = require("../models/conversation");
const Message = require("../models/messages");

module.exports = (io) => {
    io.on('connection', function (socket) {
        socket.on('action', async (action) => {
            if (action.type === 'messenger/createConversation') {
                //agar conversation avvaldan mavjud bo'lsa uni topib qaytarib beramiz
                const conversation = await Conversation.find({'members': {$all: [action.data.ownerId, action.data.userId]}})
                if (conversation.length !== 0)
                    return  //socket.emit('action', {type:'messenger/newConversation', data:conversation[0]});

                //agar conversation avvaldan mavjud bo'lmasa yangi qo'shamiz
                const newConversation = new Conversation({members: [action.data.ownerId, action.data.userId]})
                await newConversation.save()
                // socket.emit('action', {type:'messenger/newConversation', data:newConversation});
            }

            if (action.type === 'messenger/getOwnerConversation') {
                if (action.data.userId) {
                    let conversation = await Conversation
                        .find({members: {$in: [action.data.userId]}})
                        .select({__v: 0})
                        .populate(`members`, {name: 1, photos: 1, _id: 1})

                    conversation = conversation.map(c => {
                        c.members = c.members.find(m => String(m._id) !== action.data.userId)
                        return c
                    })
                    socket.emit('action', {type: 'messenger/conversation', data: conversation})
                }
            }

            if (action.type === 'messenger/joinRoom') {
                socket.join(action.conversationId)
                const messages = await Message.find({conversationId: action.conversationId})
                io.to(action.conversationId).emit('action', {type: 'messenger/getRoomMessages', messages})
            }
            if (action.type === 'messenger/sendNewMessage') {
                const newMessage = new Message(action.message)
                await newMessage.save()
                io.to(action.message.conversationId).emit('action', {type: 'messenger/newMessage', newMessage})
            }
        })
    })
}