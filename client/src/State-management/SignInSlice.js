import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {authAPI} from '../api/authAPI'

//asyncThunk
export const sendSIgnIn = createAsyncThunk('signIn/sendSignIn', async (data) => {
        return await authAPI.signIn(data)
    }
)
//Slice
const signInSlice = createSlice({
    name: 'SignIn',
    initialState: {
        errorMessage: null,
        isAuth: false
    },
    extraReducers: {
        [sendSIgnIn.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.isAuth = action.payload.data
                localStorage.setItem('x-auth-token', action.payload.headers['x-auth-token'])
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [sendSIgnIn.rejected]: (state, action) => {
            state.errorMessage = action.data
        }
    }
})

export default signInSlice.reducer
export const {increment} = signInSlice.actions