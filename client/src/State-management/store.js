import {configureStore} from '@reduxjs/toolkit'
import signInSlice from "./SignInSlice"
import signUpSlice from "./SignUpSlice"
import profileSlice from "./ProfileSlice"
import usersSlice from './UsersSlice'
import messengerSlice from './MessengerSlice'
import {OnlineSocketIoMiddleware} from "../Redux-middleware/initOnlineSocketMiddleware";
import {messengerSocketIoMiddleware} from "../Redux-middleware/initMessengerSocketMiddleware";

export const store = configureStore({
    reducer: {
        signIn: signInSlice,
        signUp:signUpSlice,
        profile:profileSlice,
        users:usersSlice,
        messenger:messengerSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
            .concat(OnlineSocketIoMiddleware,messengerSocketIoMiddleware)
})


