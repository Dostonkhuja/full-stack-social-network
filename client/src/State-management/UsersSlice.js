import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {usersAPI} from "../api/usersAPI";
import {setFollowIdAllFollowersSlice} from "./AllFollowersSlice";

//asyncThunk
export const getUsers = createAsyncThunk('users/getUsers', async ({pageSize, pageNumber}) => {
    return await usersAPI.getUsers(pageSize, pageNumber)
})
export const follow = createAsyncThunk('users/follow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    thunkAPI.dispatch(setFollowIdAllFollowersSlice(id))
    return await usersAPI.follow(id)
})
export const unfollow = createAsyncThunk('users/unfollow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    thunkAPI.dispatch(setFollowIdAllFollowersSlice(id))
    return await usersAPI.unfollow(id)
})

//Slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        totalUsersCount: 0,
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
                state.users = action.payload.data.users
                state.totalUsersCount = action.payload.data.totalUsersCount
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

export const {setFollowId} = usersSlice.actions
export default usersSlice.reducer