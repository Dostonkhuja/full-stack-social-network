import {createSlice} from '@reduxjs/toolkit'

//Slice
const messengerSlice = createSlice({
    name: 'messenger',
    initialState: {
        ownerConversations: null,
        currentConversation: null,
        messages:null,
        allMessagesCount:0,
        allNotReadingMessageCountNotification:0,
    },
    reducers:{
        getCurrentConversation: (state, action) => {
            state.currentConversation = action.payload
        },
        setSliceToDefoult: (state) => {
            state.messages = null
        },
        setCurrentConversationToDefoult: (state) => {
            state.currentConversation = null
        }
    },
    extraReducers: {
        ['messenger/conversation']: (state, action) => {
            state.ownerConversations = action.conversation.sort(c=>c.isNotReadingCount>0 ? -1:0)
        },
        ['messenger/getRoomMessages']: (state, action) => {
            if(action.allMessagesCount){
                state.allMessagesCount = action.allMessagesCount
            }
            if(action.messages){
                if(state.messages===null){
                    state.messages = action.messages
                }else{
                    state.messages = [...state.messages,...action.messages]
                }
            }
        },
        ['messenger/newMessage']: (state, action) => {
            state.messages !== null
                ? state.messages = [action.newMessage,...state.messages]
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
            if(state.ownerConversations){
                state.ownerConversations.unshift(action.conversation)
            }else{
                state.ownerConversations = action.conversation
            }
         },
        ['messenger/newConversation']: (state, action) => {
            state.currentConversation = action.data
        },
        ['messenger/local/reconnected']: (state, action) => {
            state.currentConversation = action.data
        },
        ['messenger/isRead']: (state, action) => {
            if(action.payloadSender){
                if(state.messages !==null){
                    state.messages.map(m=>{
                        if(m._id === action.payloadSender.messageId){
                            m.isRead = action.payloadSender.isRead
                            return m
                        }
                    })
                }
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
export const {getCurrentConversation,setSliceToDefoult,setCurrentConversationToDefoult} = messengerSlice.actions