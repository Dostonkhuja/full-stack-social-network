import React, {useCallback} from 'react';
import {Avatar, Button, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {PhotoCamera} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import AboutMe from "../About-me/AboutMe";
import {useDispatch} from "react-redux";

const MainPart = ({handleCurrentImage,profile,isOwner,updateMyCoverImage,updateMyAvatar}) => {
    const dispatch = useDispatch()

    const mainPhotoSelected = useCallback((e) => {
        dispatch(updateMyAvatar(e.target.files[0]))
    }, [profile.photos])
    const mainCoverImageSelected = useCallback((e) => {
        dispatch(updateMyCoverImage(e.target.files[0]))
    }, [profile.photos])

    return <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>
        <Grid item sx={{
            borderRadius: '30px', width: '100%', height: '16rem', position: 'relative', backgroundColor:'#a0a0a0'}}
        >
            <Box width={'1pp%'} height={'100%'} sx={{
                backgroundImage: `url(${profile.photos ?profile.photos.coverImage ? profile.photos.coverImage : profile.photos.large:''})`,
                backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', cursor:'pointer',
                borderRadius: '30px', width: '100%', height: '16rem', position: 'relative', backgroundColor:'#a0a0a0'
            }}
                 onClick={()=>handleCurrentImage('coverImage')}/>

            {isOwner && <div>
                <label htmlFor="coverImage"
                       style={{position: 'absolute', bottom: '11px', right: '17px'}}>
                    <Button variant='contained' sx={{color: 'white'}} size='small' aria-label="upload picture" component="span">
                        <Typography component="p">upload cover image</Typography>
                        <PhotoCamera sx={{ml:'0.5rem'}} fontSize='medium'/>
                    </Button>
                </label>
                <input style={{display: 'none'}} type="file" id='coverImage' name="coverImage" onChange={mainCoverImageSelected}/>
            </div>}
        </Grid>

        <div style={{position: 'relative', marginTop: '-6rem'}}>
            <Avatar
                src={profile.photos ? profile.photos.large : ''}
                sx={{bgcolor: 'pink', border: '3px solid white', width: 156, height: 156, cursor: 'pointer'}}
                onClick={()=>handleCurrentImage('avatar')}
            />
            {isOwner && <div>
                <label htmlFor="avatar" style={{position: 'absolute', bottom: '3px', right: '-1px'}}>
                    <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera fontSize='large'/> </IconButton>
                </label>
                <input style={{display: 'none'}} type="file" id='avatar' name="avatar" onChange={mainPhotoSelected}/>
            </div>}
        </div>

        <Typography variant="h2" component="h1"> {profile.firstName + ' '}{profile.lastName}</Typography>
        <Typography variant="p" component="p" color={'#707070'}> {profile.aboutMe}</Typography>
        {isOwner &&  <AboutMe profile={profile}/>}
    </div>
};

export default MainPart;