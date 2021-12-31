const Conversation = require("../models/conversation");
const Message = require("../models/messages");
const mongoose = require('mongoose')

module.exports = (io) => {
    io.on('connection', function (socket) {
        socket.on('action', async (action) => {
            // yozishma honasi ochish
            if (action.type === 'messenger/createConversation') {
                //agar conversation avvaldan mavjud bo'lsa uni topib qaytarib beramiz
                let conversation = await Conversation.find({'members': {$all: [action.data.ownerId, action.data.userId]}})
                    .populate(`members`, {firstName: 1,lastName:1, photos: 1,isOnline:1, _id: 1})
                    conversation = conversation.map(c => {
                    c.members = c.members.find(m => String(m._id) === action.data.userId)
                    return c
                })

                if (conversation.length !==0)
                    return  socket.emit('action', {type:'messenger/newConversation', data:conversation[0]});

                //agar conversation avvaldan mavjud bo'lmasa yangi qo'shamiz
                let newConversation = new Conversation({members: [action.data.ownerId, action.data.userId]})
                await newConversation.save()

                conversation = await Conversation.find({'members': {$all: [action.data.ownerId, action.data.userId]}})
                    .populate(`members`, {firstName: 1,lastName:1, photos: 1,isOnline:1, _id: 1})

                    //suxbatxona tashkil bo'lgani haqida receiverga notifaction jo'natish
                    const receiver = conversation[0].members.find(m => String(m._id) !== action.data.ownerId)
                    io.to(String(receiver._id)).emit('action',{type:'messenger/convNotification',conversation:conversation[0]})
                     socket.leave(String(receiver._id))
                
                     //suxbatxonani ownerga uzatish 
                    conversation = conversation.map(c => {c.members = c.members.find(m => String(m._id) === action.data.userId)
                    return c
                    })

                  socket.emit('action', {type:'messenger/newConversation', data:conversation[0]});
            }

            //saytga kirgan vaqtda o'z suxbatxonalarini olish
            if (action.type === 'messenger/getOwnerConversation') {
                if (action.data.ownerId) {
                    let conversation = await Conversation
                        .find({members: {$in: [action.data.ownerId]}})
                        .select({__v: 0})
                        .populate(`members`, {firstName: 1,lastName:1, photos: 1,isOnline:1, _id: 1})
                    for(let index in conversation){
                         conversation[index].isNotReadingCount = await Message.find(
                             {conversationId:conversation[index]._id,sender:{$ne:action.data.ownerId},isRead:false}
                             ).countDocuments()
                             
                             conversation[index].members = conversation[index].members.find(m => String(m._id) !== action.data.ownerId) 
                    }

                    if (action.data.currentConversationId)
                    conversation = conversation.sort((a) => {
                        if (String(a._id) === action.data.currentConversationId) {
                            return -1
                        } else {
                            return 0
                        }
                    })

                    socket.emit('action', {type: 'messenger/conversation', conversation})
                }
            }

            //yozishmalar kanaliga kirish va messagelarni olish
            if (action.type === 'messenger/joinRoom') {
                socket.join(action.conversationId)
                const messages = await Message.find({conversationId: action.conversationId})
                io.to(action.conversationId).emit('action', {type: 'messenger/getRoomMessages', messages})
            }
            
            //yozishmalar kanalidan chiqib ketish
            if (action.type === 'messenger/leaveChatRoom') {
                socket.leave(action.conversationId)
            }
            
            //yangi habar o'qilganligi to'grisida bildirish
            if (action.type === 'messenger/setIsRead') {
                const message = await Message.findByIdAndUpdate(action.data.messageId,{
                    $set:{'isRead':action.data.isRead}
                },{new: true})


               

                let conversation = await Conversation
                    .findById({_id:message.conversationId})
                    .select({__v: 0})
                    const receiverId = conversation.members.find(m => String(m) !== message.sender)


                 let reciveredConversation = await Conversation.find({members: {$in: [receiverId]}}).select({__v: 0})
                 let allNotReadingCount=0
                    for(let index in reciveredConversation){
                        reciveredConversation[index].isNotReadingCount = await Message.find(
                             {conversationId:reciveredConversation[index]._id,sender:{$ne:receiverId},isRead:false}
                             ).countDocuments()
                              allNotReadingCount += reciveredConversation[index].isNotReadingCount
                    }
               
                
                io.to(message.sender).emit('action', {type:'messenger/isRead',payloadSender:{messageId:message._id,isRead:message.isRead}})
                io.to(receiverId).emit('action', {type:'messenger/isRead',
                    payloadReceiver:{ messageId:message._id,isRead:message.isRead,conversationId:message.conversationId,
                        allNotReadingMessageCountNotification:allNotReadingCount
                    }
                })                
            }

            //yangi message yuborish
            if (action.type === 'messenger/sendNewMessage') {
                const newMessage = new Message(action.message)
                await newMessage.save()
                io.to(action.message.conversationId).emit('action', {type: 'messenger/newMessage', newMessage})
               
                //qabul qiluvchining notification message kanaliga ulanib habar borganligini bildirish
                let conversation = await Conversation
                    .findById({_id:newMessage.conversationId})
                    .select({__v: 0})
                    const receiverId = conversation.members.find(m => String(m) !== action.message.sender)
                    io.to(receiverId).emit('action',{type:'messenger/notification',conversationId:newMessage.conversationId})
                   

                // message jo'natilgandan so'ng reciveredni ro'yxatning boshiga olib o'tish
                     conversation = await Conversation
                    .find({members: {$in: [action.message.sender]}})
                    .select({__v: 0})
                    .populate(`members`, {firstName: 1,lastName:1, photos: 1,isOnline:1, _id: 1})

                    for(let index in conversation){
                        conversation[index].isNotReadingCount = await Message.find(
                            {conversationId:conversation[index]._id,sender:{$ne:action.message.sender},isRead:false}
                            ).countDocuments()
                            
                            conversation[index].members = conversation[index].members.find(m => String(m._id) !== action.message.sender) 
                   }

                    conversation = conversation.sort((a) => {
                        if (String(a._id) === action.message.conversationId) {
                            return -1
                        } else {
                            return 0
                        }
                    })

                socket.emit('action', {type: 'messenger/conversation', conversation})
            }
            
            // notificationlar olish uchun owner Id nomiga kanal ochish
            if (action.type === 'messenger/notificationSubscribe') {
                 socket.join(action.ownerId)

                 let conversation = await Conversation.find({members: {$in: [action.ownerId]}}).select({__v: 0})
                
                 let allNotReadingCount=0
                    for(let index in conversation){
                         conversation[index].isNotReadingCount = await Message.find(
                             {conversationId:conversation[index]._id,sender:{$ne:action.ownerId},isRead:false}
                             ).countDocuments()
                              allNotReadingCount += conversation[index].isNotReadingCount
                    }

                    io.to(action.ownerId).emit('action', {type: 'messenger/notification', allNotReadingCount})
            }
        }),
        socket.on('user-reconnected',()=>{
            console.log(socket.connected)
            // /socket.join(ownerId)
        })
        io.on('disconnect',()=>{
            
        })
    })
}










// let conversation = await Conversation.find({members: {$in: [message.sender]}}).select({__v: 0})
//                  let allNotReadingCount=0
//                     for(let index in conversation){
//                          conversation[index].isNotReadingCount = await Message.find(
//                              {conversationId:conversation[index]._id,sender:{$ne:message.sender},isRead:false}
//                              ).countDocuments()
//                               allNotReadingCount += conversation[index].isNotReadingCount
//                     }

//                 action.data.allNotReadingMessageCountNotification = allNotReadingCount

//                 conversation = conversation.find(c=>String(c._id) === message.conversationId) 
//                 const receiverId = conversation.members.find(m => String(m) !== message.sender)