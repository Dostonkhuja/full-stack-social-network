import {createAsyncThunk} from "@reduxjs/toolkit";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('https://social-beatles.herokuapp.com/guests',{autoConnect:false,reconnection: true,transports: ["websocket"]})
export const GuestsSocketIoMiddleware = createSocketIoMiddleware(socket, "guests/")

//server dispatch
export const guestNotificationSubscribe = createAsyncThunk('guestNotification',(ownerId, thunkAPI) => {
    socket.connect()
    const _dispatchGuestNtf =()=>  thunkAPI.dispatch({type:'guests/guestNotificationSubscribe',ownerId})
     _dispatchGuestNtf()
    socket.io.on('reconnect', function () {_dispatchGuestNtf()})
})

export const getGuests = createAsyncThunk('getGuests',(payload, thunkAPI) => {
    thunkAPI.dispatch({type:'guests/sendOwnerIdForGetGuests', payload})
})

export const guesting = createAsyncThunk('guesting',(guesting, thunkAPI) => {
    thunkAPI.dispatch({type:'guests/guesting', guesting})
})

export const guestsDisconnect = createAsyncThunk('guests/disconnect',(ownerId, thunkAPI) => {
      thunkAPI.dispatch({type:'guests/forceDisconnect',ownerId})
})
