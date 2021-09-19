import {configureStore} from '@reduxjs/toolkit'
import loginReducer from "./loginSlice";

export const store = configureStore({
    reducer: {
        signIn: loginReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})