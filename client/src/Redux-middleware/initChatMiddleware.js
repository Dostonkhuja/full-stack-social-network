import {createAsyncThunk} from "@reduxjs/toolkit";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('https://social-beatles.onrender.com/chat',{autoConnect:false,reconnection: true,transports: ["websocket"]})
export const ChatSocketIoMiddleware = createSocketIoMiddleware(socket, "chat/")

//server dispatch
export const chatMessages = createAsyncThunk('chatMessages',(payload, thunkAPI) => {
    socket.connect()
    const _dispatchChatMsg =()=>  thunkAPI.dispatch({type:'chat/messages', payload})
    _dispatchChatMsg()
    socket.io.on('reconnect', function () {_dispatchChatMsg()})
})

export const chatNewMessage = createAsyncThunk('chatNewMessages',(message, thunkAPI) => {
    thunkAPI.dispatch({type:'chat/newMessage', message})
})



