import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {followedFollowingAPI} from "../api/followedFollowingAPI";

//asyncThunk
export const getFollowers = createAsyncThunk('AllFollowers/getFollowers', async ({userId,pageSize,pageNumberFollowers}) => {
    return await followedFollowingAPI.getFollowers(userId,pageSize,pageNumberFollowers)
})
export const getFollowed = createAsyncThunk('AllFollowers/getFollowed', async ({userId,pageSize,pageNumberFollowed}) => {
    return await followedFollowingAPI.getFollowed(userId,pageSize,pageNumberFollowed)
})
const follow = createAsyncThunk('users/follow')
const unfollow = createAsyncThunk('users/unfollow')

//Slice
const AllFollowersSlice = createSlice({
    name: 'AllFollowers',
    initialState: {
        followers: [],
        followed: [],
        followId:'',
        isOwnerScope:false
    },
    reducers:{
        defaultAllFollowers:(state)=>{
            state.followers = []
            state.followed = []
        },
        isOwnerScope:(state,action) => {
            state.isOwnerScope = action.payload
        },
        setFollowIdAllFollowersSlice: (state, action) => {
            state.followId = action.payload
        }
    },
    extraReducers: {
        [getFollowers.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.followers = [...state.followers,...action.payload.data]
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [follow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.followers.map(u => {
                    if (u._id === state.followId) {
                        return u.isFollow = action.payload.data.follow
                    }
                })
                state.followed.map(u => {
                    if (u._id === state.followId) {
                        u.isFollow = action.payload.data.follow
                        return u.isFollow
                    }
                })
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [unfollow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                if (state.isOwnerScope){
                    state.followed = state.followed.filter(u=> u._id !== state.followId)
                }
                state.followers.map(u => {
                    if (u._id === state.followId) {
                        u.isFollow = action.payload.data.follow
                        return u.isFollow
                    }
                })
                state.followed.map(u => {
                    if (u._id === state.followId) {
                        u.isFollow = action.payload.data.follow
                        return u.isFollow
                    }
                })
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [getFollowed.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.followed = [...state.followed,...action.payload.data]
            } else {
                state.errorMessage = action.payload.data
            }
        }
    }
})

export const {defaultAllFollowers,setFollowIdAllFollowersSlice,isOwnerScope} = AllFollowersSlice.actions
export default AllFollowersSlice.reducer