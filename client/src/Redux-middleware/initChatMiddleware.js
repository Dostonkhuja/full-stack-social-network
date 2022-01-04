import {createAsyncThunk} from "@reduxjs/toolkit";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('http://localhost:5000/chat',{autoConnect:false,reconnection: true,transports: ["websocket"]})
export const ChatSocketIoMiddleware = createSocketIoMiddleware(socket, "chat/")

//server dispatch
export const chatMessages = createAsyncThunk('chatMessages',(data, thunkAPI) => {
    socket.connect()
    const _dispatchChatMsg =()=>  thunkAPI.dispatch({type:'chat/messages', data})
    _dispatchChatMsg()
    socket.io.on('reconnect', function () {_dispatchChatMsg()})
})

export const chatNewMessage = createAsyncThunk('chatNewMessages',(message, thunkAPI) => {
    debugger
    thunkAPI.dispatch({type:'chat/newMessage', message})
})

export const chatDisconnect = createAsyncThunk('chatDisconnect',(undefined, thunkAPI) => {
   // socket.disconnect()
   //  thunkAPI.dispatch(setChatToDefoult())
})

