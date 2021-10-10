import {configureStore} from '@reduxjs/toolkit'
import signInSlice from "./SignInSlice";
import signUpSlice from "./SignUpSlice";
import profileSlice from "./ProfileSlice";
import usersSlice from './UsersSlice'

export const store = configureStore({
    reducer: {
        signIn: signInSlice,
        signUp:signUpSlice,
        profile:profileSlice,
        users:usersSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})