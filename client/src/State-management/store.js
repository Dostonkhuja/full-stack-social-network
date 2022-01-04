import AppSlice from './AppSlice'
import HomeSlice from './HomeSlice'
import ChatSlice from "./chatSlice"
import usersSlice from './UsersSlice'
import guestsSlice from "./GuestsSlice"
import signInSlice from "./SignInSlice"
import signUpSlice from "./SignUpSlice"
import profileSlice from "./ProfileSlice"
import messengerSlice from './MessengerSlice'
import {configureStore} from '@reduxjs/toolkit'
import AllFollowersSlice from "./AllFollowersSlice"
import {ChatSocketIoMiddleware} from "../Redux-middleware/initChatMiddleware"
import {GuestsSocketIoMiddleware} from "../Redux-middleware/initGuestsMiddleware"
import {OnlineSocketIoMiddleware} from "../Redux-middleware/initOnlineSocketMiddleware"
import {messengerSocketIoMiddleware} from "../Redux-middleware/initMessengerSocketMiddleware"

export const store = configureStore({
    reducer: {
        app:AppSlice,
        chat:ChatSlice,
        home:HomeSlice,
        users:usersSlice,
        guests:guestsSlice,
        signUp:signUpSlice,
        signIn: signInSlice,
        profile:profileSlice,
        messenger:messengerSlice,
        allFollowers:AllFollowersSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
            .concat(
            GuestsSocketIoMiddleware,OnlineSocketIoMiddleware,
            messengerSocketIoMiddleware,ChatSocketIoMiddleware
            )
})


