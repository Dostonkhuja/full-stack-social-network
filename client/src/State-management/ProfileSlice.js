import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../api/authAPI";
import {profileAPI} from "../api/profileAPI";

export const getAuthMe = createAsyncThunk('authMe/get', async () => {
    return await authAPI.me()
})
export const updateMyAvatar = createAsyncThunk('profile/photo', async (data) => {
    return await profileAPI.photo(data)
})
export const updateMyCoverImage = createAsyncThunk('profile/coverImage', async (data) => {
    return await profileAPI.coverImage(data)
})
export const updateMyStatus = createAsyncThunk('profile/status', async (data) => {
    return await profileAPI.status(data)
})
export const newComment = createAsyncThunk('profile/status/newComment', async (data) => {
    return await profileAPI.comment(data)
})
export const updateMyProfile = createAsyncThunk('profile', async (data) => {
    return await profileAPI.profile(data)
})
export const getProfileById = createAsyncThunk('profile/userId', async (userId) => {
    return await profileAPI.profileById(userId)
})

const profileSlice = createSlice({
    name: 'Profile',
    initialState: {
        isOwner: false,
        ownerId: '',
        ownerProfile:null,
        profile: null,
        errorMessage: null,
        photosUploadErrorMessage: null,
        statusErrorMessage: null,
        profileErrorMessage: null
    },
    reducers: {
        logoutAuth: (state,action) => {
            localStorage.removeItem('x-auth-token')
            state.isOwner = false
            state.ownerId = ''
            state.ownerProfile = null
        }
    },
    extraReducers: {
        [getAuthMe.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                console.log(action.payload.data)
                state.ownerProfile = action.payload.data
                state.profile = action.payload.data
                if(state.ownerId !== action.payload.data._id){
                    state.ownerId = action.payload.data._id
                }
                state.isOwner = true
            } else {
                state.errorMessage = action.payload.data
            }
        },
        // [getAuthMe.rejected]: (state, action) => {
        //     state.errorMessage = action.data
        // },
        // [updateMyAvatar.rejected]: (state, action) => {
        //     state.photosUploadErrorMessage = action.data
        // },
        [updateMyAvatar.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.photos = action.payload.data
            } else {
                state.photosUploadErrorMessage = action.payload.data
            }
        },
        [updateMyCoverImage.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.photos.coverImage = action.payload.data
            } else {
                state.photosUploadErrorMessage = action.payload.data
            }
        },
        [updateMyStatus.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status.push(action.payload.data)
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [newComment.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status =  state.profile.status.map(s=>{
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
        [updateMyProfile.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.fullName = action.payload.data.fullName
                state.profile.name = action.payload.data.name
                state.profile.contacts = action.payload.data.contacts
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [getProfileById.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile = action.payload.data
                if (state.ownerId === action.payload.data._id) {
                    state.isOwner = true
                } else {
                    state.isOwner = false
                }
            } else {
                state.profileErrorMessage = action.payload.data
            }
        }
    }
})

export default profileSlice.reducer
export const {logoutAuth} = profileSlice.actions