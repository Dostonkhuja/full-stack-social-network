import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {authAPI} from "../api/authAPI";

export const sendSignUp = createAsyncThunk(
    'signUp/sendSignUp', async (data,thunkAPI) => {
        thunkAPI.dispatch(setSignInData({values:{lastName:data.lastName,firstName:data.firstName,email: data.email, password: data.password}}))
        return await authAPI.signUp(data)
    })

const signUpSlice = createSlice({
    name: 'SignUp',
    initialState: {
        user: null,
        signInData: null,
        errorMessage: null
    },
    reducers: {
        setSignInData: (state,action) => {
            state.signInData = action.payload
        },
        signUpLogout: (state, action) => {
            state.user = null
            state.signInData = null
        }
    },
    extraReducers: {
        [sendSignUp.fulfilled]: (state, action) => {
            if (action.payload.status === 400) {
                state.errorMessage = action.payload.data
            } else {
                state.errorMessage = null
                state.user = action.payload
            }
        },
        [sendSignUp.rejected]: (state, action) => {
            state.errorMessage = action.data
        }
    }
})

export default signUpSlice.reducer
export const {setSignInData,signUpLogout} = signUpSlice.actions
