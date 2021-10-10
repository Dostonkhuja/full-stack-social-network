import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {Avatar, Grid, Typography} from "@mui/material";
import Status from "./status/Status";
import UpdateProfile from "./UpdateProfile";
import {Link, PhotoCamera} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const MyProfile = React.memo(({isOwner, profile, updateMyStatus, updateMyProfile, updateMyAvatar}) => {
    const dispatch = useDispatch()

    console.log('my profile rendered')

    const mainPhotoSelected = useCallback((e) => {
        dispatch(updateMyAvatar(e.target.files[0]))
    }, [profile.photos])

    return <>
            <div style={{
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <div style={{position: 'relative'}}>
                    <Avatar
                        src={profile.photos ? profile.photos.large : ''}
                        sx={{bgcolor: 'pink', width: 156, height: 156, cursor: 'pointer'}}
                    />
                    {isOwner && <div>
                        <label htmlFor="avatar"
                               style={{position: 'absolute', bottom: '3px', right: '-1px'}}>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera fontSize='large'/>
                            </IconButton>
                        </label>
                        <input style={{display: 'none'}} type="file" id='avatar' name="avatar"
                               onChange={mainPhotoSelected}/>
                    </div>
                    }
                </div>
                <Typography variant="h2" component="h1">
                    {profile.name}
                </Typography>
                <Typography variant="h4" component="h4">
                    {profile.fullName}
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {profile.email}
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {profile.contacts && profile.contacts.phoneNumber}
                </Typography>
            </div>
        {isOwner && <UpdateProfile profile={profile} updateMyProfile={updateMyProfile}/>}
        <Status isOwner={isOwner} profile={profile} updateMyStatus={updateMyStatus}/>
        {/*<Link to={'/users'}/>*/}
    </>
})

export default MyProfile