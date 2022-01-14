import React, {useLayoutEffect} from "react";
import {useParams} from "react-router-dom";
import MyProfile from "./MyProfile/MyProfile";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from '../../State-management/AppSlice'
import {guesting} from "../../Redux-middleware/initGuestsMiddleware";
import {defaultAllFollowers, getFollowed, getFollowers, isOwnerScope} from "../../State-management/AllFollowersSlice";
import {
    disliked,
    getProfileById,
    getStatus,
    liked,
    newComment,
    profileFollow,
    profileUnfollow,
    setProfileToOwner,
    showComments,
    updateMyAvatar,
    updateMyCoverImage,
    updateMyProfile,
    updateMyStatus
} from "../../State-management/ProfileSlice";
import {createNewConversation} from "../../Redux-middleware/initMessengerSocketMiddleware";

const RootProfile = () => {
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
            if(profile && profile._id !== ownerId) {
                dispatch(setProfileToOwner())
            }
        }
    }, [token, userId])

    if (!profile)
        return <></>

return profile && <MyProfile
                             token={token}
                             liked={liked}
                             profile={profile}
                             ownerId={ownerId}
                             isOwner={isOwner}
                             disliked={disliked}
                             getStatus={getStatus}
                             ownerPhoto={ownerPhoto}
                             newComment={newComment}
                             getFollowed={getFollowed}
                             showComments={showComments}
                             getFollowers={getFollowers}
                             isOwnerScope={isOwnerScope}
                             profileFollow={profileFollow}
                             updateMyAvatar={updateMyAvatar}
                             updateMyStatus={updateMyStatus}
                             profileUnfollow={profileUnfollow}
                             updateMyProfile={updateMyProfile}
                             updateMyCoverImage={updateMyCoverImage}
                             createNewConversation={createNewConversation}
                             defaultAllFollowers={defaultAllFollowers} />
    }

export default RootProfile
