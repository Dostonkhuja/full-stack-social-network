import {createAsyncThunk} from "@reduxjs/toolkit";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('http://localhost:5000/',{autoConnect:false,reconnection: true,transports: ["websocket"]});
export const OnlineSocketIoMiddleware = createSocketIoMiddleware(socket, "server/");

//server dispatch
export const initalisationSocket = createAsyncThunk('init',(id, thunkAPI) => {
   socket.connect()
    thunkAPI.dispatch({type:'server/init', data:{userId:id}})
})
export const socketDisconnect = createAsyncThunk('socket/disconnect',(id, thunkAPI) => {
      thunkAPI.dispatch({type:'server/forceDisconnect'})
})
