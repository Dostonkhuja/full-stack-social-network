import {createSlice} from '@reduxjs/toolkit'

//Slice
const messengerSlice = createSlice({
    name: 'SignIn',
    initialState: {
        ownerConversations: null,
        currentConversation: null,
        messages:null
    },
    reducers:{
        getCurrentConversation: (state, action) => {
            state.currentConversation = action.payload
        }
    },
    extraReducers: {
        ['messenger/conversation']: (state, action) => {
            state.ownerConversations = action.data
        },
        ['messenger/getRoomMessages']: (state, action) => {
            state.messages = action.messages
        },
        ['messenger/newMessage']: (state, action) => {
            state.messages !== null
                ? state.messages = [...state.messages,action.newMessage]
                : state.messages = [action.newMessage]
        }
    }
})

export default messengerSlice.reducer
export const {getCurrentConversation} = messengerSlice.actions