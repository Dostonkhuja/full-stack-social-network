import {createAsyncThunk} from "@reduxjs/toolkit";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('https://social-beatles.herokuapp.com/messenger',{autoConnect:false,reconnection: true,transports: ["websocket"]});
export const messengerSocketIoMiddleware = createSocketIoMiddleware(socket, "messenger/");

// server dispatch
export const getNotificationMsg = createAsyncThunk('notificationMsg',(ownerId, thunkAPI) => {
    socket.connect()
    const _dispatchMsgNtf =()=> thunkAPI.dispatch({type:'messenger/notificationSubscribe', ownerId})
    socket.io.on('reconnect', function (attempt) {_dispatchMsgNtf()})
    _dispatchMsgNtf()
})

export const getOwnerConversation = createAsyncThunk('init',(data, thunkAPI) => {
     const getOC= ()=> thunkAPI.dispatch({type:'messenger/getOwnerConversation', data})
       socket.on("connect", () => {getOC()});
       getOC()
})

export const createNewConversation = createAsyncThunk('create',(data, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/createConversation', data})
})

export const joinRoom = createAsyncThunk('joinRoom',(data, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/joinRoom', data})
})

export const leaveRoom = createAsyncThunk('leaveRoom',(conversationId, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/leaveChatRoom', conversationId})
})

export const setIsRead = createAsyncThunk('setIsRead',(data, thunkAPI) => {
   thunkAPI.dispatch({type:'messenger/setIsRead', data})
})

export const newMessage = createAsyncThunk('newMess',(message, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/sendNewMessage', message})
})

export const messengerDisconnect = createAsyncThunk('messenger/disconnect',(ownerId, thunkAPI) => {
    thunkAPI.dispatch({type:'messenger/forceDisconnect',ownerId})
})