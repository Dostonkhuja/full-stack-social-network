import { createSlice } from '@reduxjs/toolkit'

const ChatSlice = createSlice({
    name: 'chatSlice',
    initialState: {messages:[],chatUsers:[],userMaker:[]},
    reducers: {
        setChatToDefoult: state => {state.messages = []}
    },
    extraReducers: {
        ['chat/getChatMessages']:(state,action)=> {
            state.messages = [...state.messages,...action.chatMessages]
        },
        ['chat/getNewMessage']:(state,action)=> {
                state.messages = [action.newMessage,...state.messages]
        }
    }
})

export default ChatSlice.reducer
export const {setChatToDefoult} = ChatSlice.actions