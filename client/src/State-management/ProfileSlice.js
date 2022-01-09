import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../api/authAPI";
import {profileAPI} from "../api/profileAPI";
import {usersAPI} from "../api/usersAPI";
import {myPhotosAPI} from "../api/myPhotosAPI";

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
export const getStatus = createAsyncThunk('profile/getStatus', async (data) => {
    return await profileAPI.getStatus(data)
})
export const newComment = createAsyncThunk('profile/status/newComment', async (data) => {
    return await profileAPI.comment(data)
})
export const updateMyProfile = createAsyncThunk('profile', async (data) => {
    return await profileAPI.profile(data)
})
export const aboutMe = createAsyncThunk('profile/aboutMe', async (data) => {
    return await profileAPI.aboutMe(data)
})
export const getProfileById = createAsyncThunk('profile/userId', async (data) => {
    return await profileAPI.profileById(data)
})
export const showComments = createAsyncThunk('profile/showComments', async (data) => {
    return await profileAPI.showComments(data)
})
export const liked = createAsyncThunk('profile/liked', async (statusId) => {
    return await profileAPI.liked(statusId)
})
export const disliked = createAsyncThunk('profile/disliked', async (statusId) => {
    return await profileAPI.disLiked(statusId)
})
export const profileFollow = createAsyncThunk('profile/follow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    return await usersAPI.follow(id)
})
export const profileUnfollow = createAsyncThunk('profile/unfollow', async (id, thunkAPI) => {
    thunkAPI.dispatch(setFollowId(id))
    return await usersAPI.unfollow(id)
})

const followOutSide = createAsyncThunk('users/follow')
const unfollowOutside = createAsyncThunk('users/unfollow')

export const addNewMyPhoto = createAsyncThunk('profile/addNewMyPhoto', async (data) => {
    return await myPhotosAPI.addNewMyPhoto(data)
})
export const getMyPhotos = createAsyncThunk('profile/getMyPhotos', async (data) => {
    return await myPhotosAPI.getMyPhotos(data)
})

const profileSlice = createSlice({
    name: 'Profile',
    initialState: {
        isOwner: false,
        ownerId: '',
        ownerProfile:null,
        profile: null,
        myPhotos: null,
        followId:'',
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
        },
        setFollowId: (state, action) => {
            state.followId = action.payload
        },
        myPhotosScope: (state, action) => {
            state.myPhotos = []
        },
        setProfileToOwner: (state, action) => {
            state.isOwner = true
            state.profile = state.ownerProfile
        }
    },
    extraReducers: {
        [getAuthMe.rejected]: (state, action) => {
            state.errorMessage = action.data
        },
        [updateMyAvatar.rejected]: (state, action) => {
            state.photosUploadErrorMessage = action.data
        },
        [getAuthMe.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
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
        [getAuthMe.pending]: (state) => {
                // state.ownerProfile = null
                state.profile = null
        }
        ,[getProfileById.pending]: (state) => {
                state.profile = null
                state.myPhotos = []
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
        },
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
        [addNewMyPhoto.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.myPhotos.unshift(action.payload.data)
                state.profile.myPhotosCount = state.profile.myPhotosCount + 1
            } else {
                state.photosUploadErrorMessage = action.payload.data
            }
        },
        [updateMyStatus.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status.unshift(action.payload.data.newStatus)
                state.profile.statusCount = action.payload.data.statusCount
                if(action.payload.data.newStatus.photoFile !==null){
                    state.profile.myPhotos = [...state.profile.myPhotos,{_id:Math.random(),photo:action.payload.data.newStatus.photoFile}]
                }
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [getStatus.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status = [...state.profile.status,...action.payload.data]
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [liked.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
              state.profile.status.map(s=> {
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
        [disliked.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
               state.profile.status = state.profile.status.map(s=> {
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
        [showComments.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status = state.profile.status.map(s=>{
                    if(s._id === action.payload.data._id){
                        if(s.comments.length <= 2) {
                            s.comments = []
                            return s
                        }
                    }
                    return s
                })
                state.profile.status = state.profile.status.map( s=> {
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
        [updateMyProfile.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.firstName = action.payload.data.firstName
                state.profile.lastName = action.payload.data.lastName
                state.profile.city = action.payload.data.city
                state.profile.workPlace = action.payload.data.workPlace
                state.profile.maritalStatus = action.payload.data.maritalStatus
                state.profile.contacts = action.payload.data.contacts
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [aboutMe.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.aboutMe = action.payload.data.aboutMe
            } else {
                state.statusErrorMessage = action.payload.data
            }
        },
        [profileFollow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status.map(s => {
                    s.liked.map(l=>{
                        if(l._id ===state.followId){
                            return l.isFollow = action.payload.data.follow
                        }
                    })
                })
                state.profile.followingCount = state.profile.followingCount + 1
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [profileUnfollow.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                state.profile.status.map(s => {
                    s.liked.map(l=>{
                        if(l._id ===state.followId){
                            return l.isFollow = action.payload.data.follow
                        }
                    })
                })
                state.profile.followingCount = state.profile.followingCount - 1
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [followOutSide.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                if(state.ownerId === state.profile._id){
                    state.profile.followingCount = state.profile.followingCount + 1
                }
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [unfollowOutside.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                if(state.ownerId === state.profile._id){
                    state.profile.followingCount = state.profile.followingCount - 1
                }
            } else {
                state.errorMessage = action.payload.data
            }
        },
        [getMyPhotos.fulfilled]: (state, action) => {
            if (action.payload.status === 200) {
                if(state.myPhotos!==null){
                    state.myPhotos = [...state.myPhotos,...action.payload.data.myPhotos]
                }else{
                    state.myPhotos = action.payload.data.myPhotos
                }
            } else {
                state.errorMessage = action.payload.data
            }
        },
    }
})

export default profileSlice.reducer
export const {logoutAuth,setFollowId,myPhotosScope,setProfileToOwner} = profileSlice.actions