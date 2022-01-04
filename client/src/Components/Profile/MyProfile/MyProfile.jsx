import React, {useCallback, useRef, useState} from "react";
import Status from "./status/Status";
import {useDispatch} from "react-redux";
import UpdateProfile from "./UpdateProfile";
import Followers from "../Friends/Followers";
import {PhotoCamera} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Avatar, Button, Grid, Typography} from "@mui/material";
import AllFollowers from "./AllFollowers";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Photos from "./Photos";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AllFollowed from "./AllFollowed";
import AnythingNews from "./status/anything-news/AnythingNews";
import AllPhotos from "./AllPhotos";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AboutMe from "./AboutMe";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const MyProfile = React.memo((props) => {
    console.log('my profile rendered')

    const [currentImage, setCurrentImage] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const [value, setValue] = React.useState(0);

    const [isOpenInput, setIsOpenInput] = React.useState(false);

    const dispatch = useDispatch()

    const {
        getStatus, token, liked, disliked,
        ownerId, profileFollow, profileUnfollow,newComment,
        showComments, isOwner, ownerPhoto, profile, updateMyStatus,
        updateMyProfile, updateMyAvatar, updateMyCoverImage,
        defaultAllFollowers,getFollowers, getFollowed, isOwnerScope
    } = props

    const mainPhotoSelected = useCallback((e) => {
        dispatch(updateMyAvatar(e.target.files[0]))
    }, [profile.photos])
    const mainCoverImageSelected = useCallback((e) => {
        dispatch(updateMyCoverImage(e.target.files[0]))
    }, [profile.photos])

    const handleCurrentImage = (key,statusPhoto,myPhoto) => {
        if(key === 'coverImage'){
            profile.photos && setCurrentImage( profile.photos.coverImage ? profile.photos.coverImage : profile.photos.large)
            setIsOpen(true)
        }
        if(key === 'avatar'){
            profile.photos && setCurrentImage(profile.photos.large)
            setIsOpen(true)
        }
        if(statusPhoto){
            setCurrentImage(statusPhoto)
            setIsOpen(true)
        }
        if(myPhoto){
            setCurrentImage(myPhoto)
            setIsOpen(true)
        }
    }

    const handleTabChange = (event, newValue) => {setValue(newValue)}

    const [openAnythingNews, setOpenAnythingNews] = React.useState(false)
    const handleOpenAnythingNews = () => {setOpenAnythingNews(true)}
    const handleCloseAnythingNews = () => {setOpenAnythingNews(false)}

    const handleAddPhoto = ()=> {
        setIsOpenInput(true)
        setOpenAnythingNews(true)
    }

    return <div style={{minHeight:'60rem'}}>
        {isOpen && (<Lightbox mainSrc={currentImage} onCloseRequest={() => setIsOpen(false)}/>)}

        <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabChange}>
                <Tab label="Publications"/>
                <Tab label={"Followers " + profile.followedCount}/>
                <Tab label={"Followed " + profile.followingCount}/>
                <Tab label="Photos"/>
                {isOwner && <UpdateProfile profile={profile} updateMyProfile={updateMyProfile}/>}
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <Grid item spacing={1} container xs={12}>
                <Grid item xs={5} sx={{position:'relative'}}>
                    <div>
                        <div style={{display:'flex',color:'#1a1a1a',alignItems:'center',justifyContent:'space-between',paddingLeft:'1.5rem',paddingBottom:'1rem'}}>
                            <Typography>
                                <b>brief information</b>
                            </Typography>
                        </div>
                        <Typography  sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
                          <LocationCityIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/><span style={{color:'#707070',marginRight:'0.5rem'}}>city:</span> { profile.city}
                        </Typography>
                        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
                            <FavoriteIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/><span style={{color:'#707070',marginRight:'0.5rem'}}>marital status:</span>  {profile.maritalStatus}
                        </Typography>
                        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
                           <WorkIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/> <span style={{color:'#707070',marginRight:'0.5rem'}}>work Place:</span> {profile.workPlace}
                        </Typography>
                        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
                          <EmailIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/> <span style={{color:'#707070',marginRight:'0.5rem'}}>email:</span> {profile.email}
                        </Typography>
                        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
                         <PhoneInTalkIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/> <span style={{color:'#707070',marginRight:'0.5rem'}}>contacts:</span> {profile.contacts && profile.contacts.phoneNumber}
                        </Typography>
                    </div>
                    <div>
                        <Photos handleCurrentImage={handleCurrentImage} profile={profile} handleTabChange={handleTabChange}/>
                    </div>
                    <div style={{position: 'sticky',top:'4rem', marginTop:'2rem'}}>
                        <div>
                            <Followers handleTabChange={handleTabChange} profile={profile} />
                        </div>
                        {
                            <Typography sx={{textAlign:'center',fontSize:'14px'}}>
                                Privacy · Terms of Service · Advertising · Advertising Preferences · Cookies · © Doston Sheraliyev 2021
                            </Typography>}
                    </div>
                </Grid>
                {<Grid item xs={7}>
                    <Status isOwner={isOwner} showComments={showComments} ownerId={ownerId}  profileFollow={profileFollow}
                            profileUnfollow={profileUnfollow} liked={liked} disliked={disliked} ownerPhoto={ownerPhoto} newComment={newComment}
                            token={token} profile={profile} updateMyStatus={updateMyStatus} getStatus={getStatus} handleCurrentImage={handleCurrentImage}
                            handleCloseAnythingNews={handleCloseAnythingNews} openAnythingNews={openAnythingNews} handleOpenAnythingNews={handleOpenAnythingNews}/>
                </Grid>}
            </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <AllFollowers ownerId={ownerId} token={token} userId={profile._id} followedCount={profile.followedCount}  defaultAllFollowers={defaultAllFollowers} getFollowers={getFollowers}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <AllFollowed  userId={profile._id} followingCount={profile.followingCount} token={token} ownerId={ownerId} defaultAllFollowers={defaultAllFollowers} getFollowed={getFollowed} isOwnerScope={isOwnerScope} />
        </TabPanel>
        <TabPanel value={value} index={3}>
                <Box fullWidth={true} sx={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                    <Typography>
                        <b>Photos</b>
                    </Typography>
                    <Button onClick={handleAddPhoto}>add photo</Button>
                </Box>
                    <AllPhotos userId={profile._id} myPhotosCount={profile.myPhotosCount} handleCurrentImage={handleCurrentImage} />

            <AnythingNews open={openAnythingNews} setIsOpenInput={setIsOpenInput} isOpenInput={isOpenInput} handleCloseAnythingNews={handleCloseAnythingNews} profile={profile} isOwner={isOwner} updateMyStatus={updateMyStatus}/>
        </TabPanel>
    </div>
})

export default MyProfile