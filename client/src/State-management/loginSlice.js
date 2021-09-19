import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {authAPI} from '../api/authAPI'

//asyncThunk
export const sendSIgnIn = createAsyncThunk(
    'signIn/sendSignIn',
    async (data) => {
        const response = await authAPI.signIn(data)
        return response
    }
)
//Slice
const loginSlice = createSlice({
    name: 'SignIn',
    initialState: {
        isOwner: false,
        errorMessage:null
    },
    reducers: {},
    extraReducers: {
        [sendSIgnIn.fulfilled]: (state, action) => {
            if(action.payload.status === 400) {
                 state.errorMessage = action.payload.data
            }else{
                state.errorMessage = null
                state.isOwner = action.payload
            }
        },
        [sendSIgnIn.rejected]: (state, action) => {
            state.errorMessage = action.data
        }
    }
})

export default loginSlice.reducer
export const {increment} = loginSlice.actions