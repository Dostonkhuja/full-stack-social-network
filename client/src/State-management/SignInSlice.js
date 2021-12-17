import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {authAPI} from '../api/authAPI'

//asyncThunk
export const sendSIgnIn = createAsyncThunk('signIn/sendSignIn', async (data) => {
        return await authAPI.signIn(data)
    })


//Slice
const signInSlice = createSlice({
    name: 'SignIn',
    initialState: {
        errorMessage: null,
        isAuth: false,
        logout: false
    },
    reducers:{
        logout:(state,action)=>{
            state.isAuth = action.payload
        }
    },
    extraReducers: {
        [sendSIgnIn.rejected]: (state, action) => {
            state.errorMessage = action.data
        },
        [sendSIgnIn.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.isAuth = action.payload.data
                localStorage.setItem('x-auth-token', action.payload.headers['x-auth-token'])
                state.errorMessage = null
            } else {
                state.errorMessage = action.payload.data
            }
        }
    }
})

export default signInSlice.reducer
export const {logout} = signInSlice.actions