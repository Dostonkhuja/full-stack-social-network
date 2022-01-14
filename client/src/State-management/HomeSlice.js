import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {homeAPI} from '../api/homeAPI'
import {profileAPI} from '../api/profileAPI'
import {usersAPI} from '../api/usersAPI'

export const getStatusForHome = createAsyncThunk('home/getStatus',async(data)=>{
    return await homeAPI.getStatusForHome(data)
})

export const showCommentsHomeStatus = createAsyncThunk('home/showCommentsHomeStatus', async (data) => {
    return await profileAPI.showComments(data)
})

export const newCommentHomeStatus = createAsyncThunk('home/newCommentHomeStatus', async (data) => {
    return await profileAPI.comment(data)
})

export const likedHomePage = createAsyncThunk('home/likedHomePage', async (statusId) => {
    return await profileAPI.liked(statusId)
})

export const dislikedHomePage = createAsyncThunk('home/dislikedHomePage', async (statusId) => {
    return await profileAPI.disLiked(statusId)
})
export const updateMyStatusHome = createAsyncThunk('home/updateMyStatusHome', async (data) => {
    return await profileAPI.status(data)
})

export const homeFollow = createAsyncThunk('home/follow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    return await usersAPI.follow(id)
})

export const homeUnfollow = createAsyncThunk('home/unfollow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    return await usersAPI.unfollow(id)
})

const HomeSlice = createSlice({
    name: 'HomeSlice',
    initialState: {
        status:null,
        statusErrorMessage:null,
        followId:''
    },
    reducers: {
        setStatusToNull:(state)=>{
            state.status=null
        },
        setFollowId:(state,action)=>{
            state.followId = action.payload
        }
    },
    extraReducers: {
        [getStatusForHome.fulfilled]:(state,action)=>{
           if(state.status === null){
            state.status = action.payload.data
           }else{
           state.status = [...state.status,...action.payload.data]
           }
        },
        [showCommentsHomeStatus.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                 state.status.map(s=>{
                    if(s._id === action.payload.data._id){
                        if(s.comments.length <= 2) {
                            s.comments = []
                            return s
                        }
                    }
                    return s
                })
              state.status.map( s=> {
                    if(s._id === action.payload.data._id){
                        s.comments = [...s.comments,...action.payload.data.comments]
                        return s
                    }
                    return s
                })
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [newCommentHomeStatus.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.status.map(s=>{
                    if(s._id === action.payload.data.statusId){
                        s.comments = [...s.comments,action.payload.data]
                        return s
                    }
                    return s
                })
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [likedHomePage.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
              state.status.map(s=> {
                   if(s._id === action.payload.data._id){
                       s.liked = action.payload.data.liked
                       s.likeCount = action.payload.data.likeCount
                       return s
                   }else{
                        return s
                   }
               })
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [dislikedHomePage.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
              state.status.map(s=> {
                   if(s._id === action.payload.data._id){
                       s.liked = action.payload.data.liked
                       s.likeCount = action.payload.data.likeCount
                       return s
                   }else{
                       return s
                   }
               })
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [homeFollow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.status.map(s => {
                    s.liked.map(l=>{
                        if(l._id ===state.followId){
                            return l.isFollow = action.payload.data.follow
                        }
                    })
                })
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [homeUnfollow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.status.map(s => {
                    s.liked.map(l=>{
                        if(l._id ===state.followId){
                            return l.isFollow = action.payload.data.follow
                        }
                    })
                })
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [updateMyStatusHome.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.status.unshift(action.payload.data.newStatus)
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
    }
})

export default HomeSlice.reducer
export const {setStatusToNull,setFollowId } = HomeSlice.actions 