import {createSlice} from '@reduxjs/toolkit'

//Slice
const messengerSlice = createSlice({
    name: 'messenger',
    initialState: {
        ownerConversations: null,
        currentConversation: null,
        messages:null,
        allNotReadingMessageCountNotification:0,
    },
    reducers:{
        getCurrentConversation: (state, action) => {
            state.currentConversation = action.payload
        },
        setSliceToDefoult: (state) => {
            state.messages = null
        }
    },
    extraReducers: {
        ['messenger/conversation']: (state, action) => {
            state.ownerConversations = action.conversation.sort(c=>c.isNotReadingCount>0 ? -1:0)
        },
        ['messenger/getRoomMessages']: (state, action) => {
            state.messages = action.messages
        },
        ['messenger/newMessage']: (state, action) => {
            state.messages !== null
                ? state.messages = [...state.messages,action.newMessage]
                : state.messages = [action.newMessage]
        },
        ['messenger/notification']: (state, action) => {
           if(action.conversationId){
            state.allNotReadingMessageCountNotification +=1
            if(state.ownerConversations){
                state.ownerConversations.map(c=>{
                    if(c._id === action.conversationId){
                        c.isNotReadingCount = c.isNotReadingCount + 1
                        return c
                    }
                    return c
                })
               }
           }
           if(action.allNotReadingCount){
            state.allNotReadingMessageCountNotification = action.allNotReadingCount
           }
        },
        ['messenger/convNotification']: (state, action) => {
             state.ownerConversations.unshift(action.conversation)
         },
        ['messenger/newConversation']: (state, action) => {
            state.currentConversation = action.data
        },
        ['messenger/local/reconnected']: (state, action) => {
            debugger
            state.currentConversation = action.data
        },
        ['messenger/isRead']: (state, action) => {
            if(action.payloadSender){
            state.messages.map(m=>{
                if(m._id === action.payloadSender.messageId){
                    m.isRead = action.payloadSender.isRead
                    return m
                }
            })
        }
        if(action.payloadReceiver){
            state.allNotReadingMessageCountNotification = action.payloadReceiver.allNotReadingMessageCountNotification
            state.ownerConversations.map(c=>{
                if(c._id === action.payloadReceiver.conversationId){
                    c.isNotReadingCount = 0
                    return c
                }
                return c
            })
            state.messages.map(m=>{
                if(m._id === action.payloadReceiver.messageId){
                    m.isRead = action.payloadReceiver.isRead
                    return m
                }
            })
        }
    }
    }
})

export default messengerSlice.reducer
export const {getCurrentConversation,setSliceToDefoult} = messengerSlice.actions