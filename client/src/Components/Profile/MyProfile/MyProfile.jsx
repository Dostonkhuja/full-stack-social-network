import React, {useCallback} from "react";
import Status from "./status/Status";
import {useDispatch} from "react-redux";
import UpdateProfile from "./UpdateProfile";
import Followers from "../Friends/Followers";
import {PhotoCamera} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Avatar, Grid, Typography} from "@mui/material";

const MyProfile = React.memo(({isOwner, profile, updateMyStatus, updateMyProfile, updateMyAvatar, updateMyCoverImage}) => {
    const dispatch = useDispatch()

    console.log('my profile rendered')

    const mainPhotoSelected = useCallback((e) => {
        dispatch(updateMyAvatar(e.target.files[0]))
    }, [profile.photos])

    const mainCoverImageSelected = useCallback((e) => {
        dispatch(updateMyCoverImage(e.target.files[0]))
    }, [profile.photos])

    return <>
        <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>

            <Grid item sx={{
                backgroundImage: `url(${profile.photos ?profile.photos.coverImage ? profile.photos.coverImage : profile.photos.large:''})`,
                backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                borderRadius: '30px', width: '100%', height: '16rem', position: 'relative', backgroundColor:'#a0a0a0'}}>
                {isOwner && <div>
                        <label htmlFor="coverImage"
                           style={{position: 'absolute', bottom: '11px', right: '17px'}}>
                            <IconButton sx={{color: 'white'}} aria-label="upload picture" component="span">
                                    <Typography component="p">upload cover image</Typography>
                            <PhotoCamera fontSize='large'/>
                            </IconButton>
                         </label>
                    <input style={{display: 'none'}} type="file" id='coverImage' name="coverImage" onChange={mainCoverImageSelected}/>
                </div>}
            </Grid>

            <div style={{position: 'relative', marginTop: '-6rem'}}>
                <Avatar
                    src={profile.photos ? profile.photos.large : ''}
                    sx={{bgcolor: 'pink', border: '3px solid white', width: 156, height: 156, cursor: 'pointer'}}
                />
                {isOwner && <div>
                    <label htmlFor="avatar" style={{position: 'absolute', bottom: '3px', right: '-1px'}}>
                        <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera fontSize='large'/> </IconButton>
                    </label>
                    <input style={{display: 'none'}} type="file" id='avatar' name="avatar" onChange={mainPhotoSelected}/>
                </div>}
            </div>

            <Typography variant="h2" component="h1"> {profile.name}</Typography>
            <Typography variant="h4" component="h4">{profile.fullName}</Typography>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>{profile.email}</Typography>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>{profile.contacts && profile.contacts.phoneNumber}</Typography>
        </div>

        {isOwner && <UpdateProfile profile={profile} updateMyProfile={updateMyProfile}/>}

        <Grid item spacing={1} container xs={12}>
            <Grid item xs={5}>
                <Followers profile={profile}/>
            </Grid>
            <Grid item xs={7}>
                <Status isOwner={isOwner} profile={profile} updateMyStatus={updateMyStatus}/>
            </Grid>
        </Grid>
    </>
})

export default MyProfile