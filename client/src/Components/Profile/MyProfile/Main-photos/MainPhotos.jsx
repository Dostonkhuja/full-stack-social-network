import React from 'react';
import Box from "@mui/material/Box";
import {Button, Grid, Typography} from "@mui/material";
import AllPhotos from "../All-photos/AllPhotos";
import AnythingNews from "../status/anything-news/AnythingNews";

const MainPhotos = ({profile,handleCurrentImage,setOpenAnythingNews,openAnythingNews,handleCloseAnythingNews,isOwner,updateMyStatus}) => {
    const [isOpenInput, setIsOpenInput] = React.useState(false);

    const handleAddPhoto = ()=> {
        setIsOpenInput(true)
        setOpenAnythingNews(true)
    }

    return <Grid container>
        <Box fullWidth sx={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:"100%"}}>
            <Typography>
                <b>Photos</b>
            </Typography>
            {isOwner && <Button onClick={handleAddPhoto} sx={{mr:'3.2rem'}}>add photo</Button>}
        </Box>
        <AllPhotos userId={profile._id} myPhotosCount={profile.myPhotosCount} handleCurrentImage={handleCurrentImage} />

        <AnythingNews open={openAnythingNews} setIsOpenInput={setIsOpenInput} isOpenInput={isOpenInput} handleCloseAnythingNews={handleCloseAnythingNews} profile={profile} isOwner={isOwner} updateMyStatus={updateMyStatus}/>
    </Grid>
}

export default MainPhotos;