import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {usersAPI} from "../api/usersAPI";

//asyncThunk
export const getUsers = createAsyncThunk('users/getUsers', async () => await usersAPI.getUsers())
export const follow = createAsyncThunk('users/follow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    return await usersAPI.follow(id)
})
export const unfollow = createAsyncThunk('users/follow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    return await usersAPI.unfollow(id)
})

//Slice
const usersSlice = createSlice({
    name: 'SignIn',
    initialState: {
        users: null,
        followId: '',
        errorMessage: null,
    },
    reducers: {
        setFollowId: (state, action) => {
            state.followId = action.payload
        }
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.users = action.payload.data
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [getUsers.rejected]: (state, action) => {
            state.errorMessage = action.payload.data
        },
        [follow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.users.map(u => {
                    if (u._id === state.followId) {
                        return u.isFollow = action.payload.data.follow
                    }
                })
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [unfollow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.users.map(u => {
                    if (u._id === state.followId) {
                        return u.isFollow = action.payload.data.follow
                    }
                })
            } else {
                state.errorMessage = action.payload.data
            }
        }
    }
})

export default usersSlice.reducer
export const {setFollowId} = usersSlice.actions