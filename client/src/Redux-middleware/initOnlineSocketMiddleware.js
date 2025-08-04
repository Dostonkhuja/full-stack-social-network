import {createAsyncThunk} from "@reduxjs/toolkit";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('https://social-beatles.onrender.com/',{autoConnect:false,reconnection: true,transports: ["websocket"]});
export const OnlineSocketIoMiddleware = createSocketIoMiddleware(socket, "server/");

//server dispatch
export const initalisationSocket = createAsyncThunk('init',(id, thunkAPI) => {
    socket.connect()
    const _dispatchInit =()=>  thunkAPI.dispatch(thunkAPI.dispatch({type:'server/init', payload:{userId:id}}))
    _dispatchInit()
    socket.io.on('reconnect', function () {_dispatchInit()})
})

export const socketDisconnect = createAsyncThunk('socket/disconnect',(id, thunkAPI) => {
      thunkAPI.dispatch({type:'server/forceDisconnect'})
})
