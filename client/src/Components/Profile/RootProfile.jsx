import React, {useEffect, useLayoutEffect} from "react";
import MyProfile from "./MyProfile/MyProfile";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {
    liked,
    disliked,
    getAuthMe,
    getStatus,
    showComments,
    profileFollow,
    getProfileById,
    updateMyAvatar,
    updateMyStatus,
    profileUnfollow,
    newComment,
    updateMyProfile,
    updateMyCoverImage} from "../../State-management/ProfileSlice";
import {defaultAllFollowers, getFollowed, getFollowers, isOwnerScope} from "../../State-management/AllFollowersSlice";
import {setCurrentPage} from '../../State-management/AppSlice'

const RootProfile = () => {
    console.log('Root Profile')

    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = useParams()
    const token = localStorage.getItem('x-auth-token')
    const isOwner = useSelector(state => state.profile.isOwner)
    const profile = useSelector((state) => state.profile.profile)
    const ownerId = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile._id : '')
    const ownerPhoto = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile.photos.large : null)

    useLayoutEffect(() => {
        dispatch(setCurrentPage(0))
        if (userId) {
            if (ownerId) {
                dispatch(getProfileById({userId, ownerId}))
                 window.scrollTo(0, 0)
            } else {
                dispatch(getProfileById(userId))
            }
        } else {
            token ? dispatch(getAuthMe()) : history.push('/signIn')
        }
    }, [token, userId])

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
                                 defaultAllFollowers={defaultAllFollowers}
                                 getFollowers={getFollowers}
                                 getFollowed={getFollowed}
                                 isOwnerScope={isOwnerScope}
                                 newComment={newComment}
    />
}

export default RootProfile