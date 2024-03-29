const Guests = require('../models/guests')
const mongoose = require("mongoose");

module.exports = (io) => {
    let connections = []
    io.on('connection', function(socket){
        socket.on('action', async (action) => {
            if(action.type === 'guests/guestNotificationSubscribe') {
                const isValidId = mongoose.Types.ObjectId.isValid(action.ownerId)
                if (isValidId) {
                    socket.join(action.ownerId)
                    connections.push({ownerId: action.ownerId, socketId: socket.id})

                    const allNotSeenCount = await Guests.countDocuments({hostId: action.ownerId, wasSeen: false})
                    const allGuestCount = await Guests.countDocuments({hostId: action.ownerId})
                    io.to(action.ownerId).emit('action', {
                        type: 'guest/guestNotification',
                        payload: {allNotSeenCount, allGuestCount}
                    })
                }
            }
            if(action.type === 'guests/sendOwnerIdForGetGuests'){
                const guests = await Guests
                    .find({hostId: action.payload.ownerId})
                    .skip((action.payload.pageNumber-1) * action.payload.pageSize)
                    .limit(action.payload.pageSize)
                    .select({guest:1,createdAt:1,wasSeen:1})
                    .sort({createdAt:-1})
                    .populate('guest',{lastName:1,firstName:1,photos:1})
                if(action.payload.ownerId){
                    let wasSeenCount=0
                    for(let index in guests){
                        if(guests[index].wasSeen === false){
                            await Guests.findByIdAndUpdate(guests[index]._id, {$set:{'wasSeen':true}})
                            wasSeenCount = wasSeenCount + 1
                            guests[index].wasSeen = true
                        }
                    }

                    io.to(action.payload.ownerId).emit('action', {type:'guests/guests', payload:{guests,wasSeenCount}})
                    wasSeenCount=0
                }
            }
            if(action.type === 'guests/guesting' && action.guesting.hostId !== action.guesting.guest){
                if(action.guesting){
                    let guest = new Guests(action.guesting)
                    await guest.save()
                    const connection = connections.find(c=>c.ownerId === action.guesting.hostId)
                    if(connection){
                        const allNotSeenCount = await Guests.countDocuments({hostId:action.guesting.hostId,wasSeen: false})
                        io.to(action.guesting.hostId).emit('action', {type:'guests/NewGuest', payload:{allNotSeenCount}});
                    }
                }
            }
            if(action.type === 'guests/forceDisconnect'){
                socket.leave(action.ownerId)
                connections = connections.filter(c=>c.ownerId !== action.ownerId)
            }
            socket.on('disconnect',() => {
                console.log('socket disconnected')
                const connection = connections.find(c=>c.socketId === socket.id)
                if(connection){
                    socket.leave(connection.ownerId)
                    connections = connections.filter(c=>c.socketId !== socket.id)
                }
            })
        })
    })
}