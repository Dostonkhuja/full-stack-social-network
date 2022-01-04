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
    updateMyCoverImage, setProfileToOwner
} from "../../State-management/ProfileSlice";
import {defaultAllFollowers, getFollowed, getFollowers, isOwnerScope} from "../../State-management/AllFollowersSlice";
import {setCurrentPage} from '../../State-management/AppSlice'
import {guesting} from "../../Redux-middleware/initGuestsMiddleware";

const RootProfile = () => {
    console.log('Root Profile')

    const dispatch = useDispatch()


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
                dispatch(guesting({hostId:userId,guest:ownerId}))
                dispatch(getProfileById({userId, ownerId}))
                 window.scrollTo(0, 0)
            } else {
                dispatch(getProfileById(userId))
            }
        }
         else {
            if(profile && profile._id!== ownerId) {
                dispatch(setProfileToOwner())
            }
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