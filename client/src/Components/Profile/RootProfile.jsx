import React, {useEffect, useLayoutEffect} from "react";
import MyProfile from "./MyProfile/MyProfile";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {
    getAuthMe,
    profileFollow,
    profileUnfollow,
    getProfileById,
    liked,
    disliked,
    showComments,
    updateMyAvatar,
    updateMyCoverImage,
    updateMyProfile,
    updateMyStatus,
    getStatus
} from "../../State-management/ProfileSlice";

const RootProfile = () => {
    console.log('Root Profile')

    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = useParams()
    const token = localStorage.getItem('x-auth-token')
    const isOwner = useSelector(state => state.profile.isOwner)
    const ownerPhoto = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile.photos.large : null)
    const ownerId = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile._id:'')
    const profile = useSelector((state) => state.profile.profile)

    useEffect(() => {
        if (userId){
            if (ownerId){
                dispatch(getProfileById({userId,ownerId}))
                return window.scrollTo(0, 0)
            }else{
                return dispatch(getProfileById(userId))
            }
        }
        else {token ? dispatch(getAuthMe()) : history.push('/signIn')}
    }, [token,userId])

    if (!profile)
        return <></>

    return profile && <MyProfile profile={profile}
                                 token={token}
                                 showComments={showComments}
                                 liked={liked}
                                 getStatus={getStatus}
                                 disliked={disliked}
                                 profileFollow={profileFollow}
                                 profileUnfollow={profileUnfollow}
                                 isOwner={isOwner}
                                 ownerPhoto={ownerPhoto}
                                 ownerId={ownerId}
                                 updateMyAvatar={updateMyAvatar}
                                 updateMyProfile={updateMyProfile}
                                 updateMyStatus={updateMyStatus}
                                 updateMyCoverImage={updateMyCoverImage}
    />
}

export default RootProfile