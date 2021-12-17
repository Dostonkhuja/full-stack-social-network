import {createAsyncThunk} from "@reduxjs/toolkit";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('http://localhost:5000/messenger',{autoConnect:false,transports: ["websocket"]});
export const messengerSocketIoMiddleware = createSocketIoMiddleware(socket, "messenger/");

// server dispatch
export const getOwnerConversation = createAsyncThunk('init',(id, thunkAPI) => {
   socket.connect()
    thunkAPI.dispatch({type:'messenger/getOwnerConversation', data:{userId:id}})
})

export const createNewConversation = createAsyncThunk('create',(data, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/createConversation', data})
})

export const joinRoom = createAsyncThunk('joinRoom',(conversationId, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/joinRoom', conversationId})
})

export const newMessage = createAsyncThunk('newMess',(message, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/sendNewMessage', message})
})