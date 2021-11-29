import React, {useEffect} from "react";
import MyProfile from "./MyProfile/MyProfile";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {getAuthMe, getProfileById, updateMyAvatar, updateMyCoverImage, updateMyProfile, updateMyStatus} from "../../State-management/ProfileSlice";

const RootProfile = () => {
    console.log('Root Profile')

    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = useParams()
    const token = localStorage.getItem('x-auth-token')
    const isOwner = useSelector(state => state.profile.isOwner)
    const profile = useSelector((state) => state.profile.profile)

    useEffect(() => {
        if (userId){return dispatch(getProfileById(userId))}
        else {token ? dispatch(getAuthMe()) : history.push('/signIn')}
    }, [token])

    return profile && <MyProfile profile={profile}
                                 isOwner={isOwner}
                                 updateMyAvatar={updateMyAvatar}
                                 updateMyProfile={updateMyProfile}
                                 updateMyStatus={updateMyStatus}
                                 updateMyCoverImage={updateMyCoverImage}/>
}

export default RootProfile