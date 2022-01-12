import React from "react";
import Photos from "./Photos/Photos";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Status from "./status/Status";
import Tabs from "@mui/material/Tabs";
import 'react-image-lightbox/style.css';
import AllFollowed from "./All-followed/AllFollowed";
import AllFollowers from "./All-followers/AllFollowers";
import UpdateProfile from "./Update-profile/UpdateProfile";
import Lightbox from 'react-image-lightbox';
import MainPart from "./Main-part/MainPart";
import Followers from "./Friends/Followers";
import {Grid, Typography} from "@mui/material";
import MainPhotos from "./Main-photos/MainPhotos";
import BriefInformation from "./Brief-information/BriefInformation";
import EmailIcon from "@mui/icons-material/Email";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

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
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentImage, setCurrentImage] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)
    const [value, setValue] = React.useState(0);

    const {
        createNewConversation,getStatus, token, liked, disliked,
        ownerId, profileFollow, profileUnfollow,newComment,
        showComments, isOwner, ownerPhoto, profile, updateMyStatus,
        updateMyProfile, updateMyAvatar, updateMyCoverImage,
        defaultAllFollowers,getFollowers, getFollowed, isOwnerScope} = props

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

    const handleSendMessage = () => {
        dispatch(createNewConversation({ownerId,userId:profile._id}))
        history.push('/messenger')
    }

    const handleTabChange = (event, newValue) => {setValue(newValue)}

    const [openAnythingNews, setOpenAnythingNews] = React.useState(false)
    const handleOpenAnythingNews = () => {setOpenAnythingNews(true)}
    const handleCloseAnythingNews = () => {setOpenAnythingNews(false)}

    return <div style={{minHeight:'60rem'}}>
        {isOpen && (<Lightbox mainSrc={currentImage} onCloseRequest={() => setIsOpen(false)}/>)}

        <MainPart handleCurrentImage={handleCurrentImage} profile={profile} updateMyAvatar={updateMyAvatar}
                  updateMyCoverImage={updateMyCoverImage} isOwner={isOwner}/>

        <Box sx={{ borderBottom: 1, borderColor: 'divider',display:'flex',justifyContent:'space-around' }}>
            <Tabs value={value} onChange={handleTabChange}>
                <Tab label="Publications"/>
                <Tab label={"Followers " + profile.followedCount}/>
                <Tab label={"Followed " + profile.followingCount}/>
                <Tab label="Photos"/>
            </Tabs>
            <div>
                {!isOwner && token &&
                    <div onClick={handleSendMessage} style={{cursor:'pointer',marginTop:"0.7rem",width:'100%'}}>
                        <EmailIcon color={ 'primary'}/>
                    </div>}

                {isOwner &&<div style={{display:'fex',justifyContent:'space-around',width:'100%',marginRight:'5.2rem'}}>
                    <UpdateProfile profile={profile} updateMyProfile={updateMyProfile}/>
                </div>}
            </div>
        </Box>

        <TabPanel value={value} index={0}>
            <Grid item spacing={1} container xs={12}>
                <Grid item xs={5} sx={{position:'relative'}}>
                    <BriefInformation profile={profile}/>
                    <Photos handleCurrentImage={handleCurrentImage} profile={profile} handleTabChange={handleTabChange}/>
                    <div style={{position: 'sticky',top:'4rem', marginTop:'2rem'}}>
                        <Followers handleTabChange={handleTabChange} profile={profile} />
                        <Typography sx={{textAlign:'center',fontSize:'14px'}}>
                                Privacy · Terms of Service · Advertising · Advertising Preferences · Cookies · © Doston Sheraliyev 2021
                        </Typography>
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
            <AllFollowed  userId={profile._id} followingCount={profile.followingCount} token={token}
                          ownerId={ownerId} defaultAllFollowers={defaultAllFollowers}
                          getFollowed={getFollowed} isOwnerScope={isOwnerScope} />
        </TabPanel>
        <TabPanel value={value} index={3}>
            <MainPhotos profile={profile} setOpenAnythingNews={setOpenAnythingNews}
                        handleCurrentImage={handleCurrentImage} openAnythingNews={openAnythingNews}
                        handleCloseAnythingNews={handleCloseAnythingNews} isOwner={isOwner}
                        updateMyStatus={updateMyStatus}/>
        </TabPanel>
    </div>
})

export default MyProfile