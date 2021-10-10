import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getAuthMe, getProfileById, updateMyAvatar, updateMyProfile, updateMyStatus
} from "../../State-management/ProfileSlice";
import MyProfile from "./MyProfile/MyProfile";
import {useHistory, useParams} from "react-router-dom";

const RootProfile = React.memo(() => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {userId} = useParams()
    const token = localStorage.getItem('x-auth-token')
    const profile = useSelector((state) => state.profile.profile)
    const isOwner = useSelector(state => state.profile.isOwner)

    useEffect(() => {
        if (userId)
            return dispatch(getProfileById(userId))

        token ? dispatch(getAuthMe()) : history.push('/signIn')
    }, [])

    return <>
        {
            profile && <MyProfile profile={profile} isOwner={isOwner}
                                  updateMyAvatar={updateMyAvatar}
                                  updateMyProfile={updateMyProfile}
                                  updateMyStatus={updateMyStatus}
            />
        }
    </>
})

export default RootProfile