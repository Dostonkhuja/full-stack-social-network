import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../api/authAPI";
import {profileAPI} from "../api/profileAPI";

export const getAuthMe = createAsyncThunk('authMe/get', async () => {
    return await authAPI.me()
})
export const updateMyAvatar = createAsyncThunk('profile/photo', async (data) => {
    return await profileAPI.photo(data)
})
export const updateMyStatus = createAsyncThunk('profile/status', async (data) => {
    return await profileAPI.status(data)
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
        profile: null,
        errorMessage: null,
        photosUploadErrorMessage: null,
        statusErrorMessage: null,
        profileErrorMessage: null
    },
    extraReducers: {
        [getAuthMe.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile = action.payload.data
                state.ownerId = action.payload.data._id
                state.isOwner = true
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [getAuthMe.rejected]: (state, action) => {
            state.errorMessage = action.data
        },
        [updateMyAvatar.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.photos = action.payload.data
            } else {
                state.photosUploadErrorMessage = action.payload.data
            }
        },
        [updateMyAvatar.rejected]: (state, action) => {
            state.photosUploadErrorMessage = action.data
        },
        [updateMyStatus.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status = action.payload.data
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
                    console.log('true')
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
export const {setIsOwnerId} = profileSlice.actions