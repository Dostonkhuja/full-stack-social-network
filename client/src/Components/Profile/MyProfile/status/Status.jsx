import React, {useState} from "react";
import StatusMedia from './Status-media/StatusMedia'
import {Avatar, Button, Card, Typography} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch} from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import AnythingNews from "./anything-news/AnythingNews";

const Status = ({newStatusIsPending,newComment,handleOpenAnythingNews,handleCloseAnythingNews,openAnythingNews,handleCurrentImage,getStatus,token,liked,disliked,ownerId,profileUnfollow,profileFollow,showComments,isOwner,ownerPhoto, profile, updateMyStatus}) => {
    const dispatch = useDispatch()

    const profileId = profile._id
    const [pageNumber,setPageNubmer] = useState(2)

    const fetchMoreData = () => {
        setPageNubmer(pageNumber + 1)
        dispatch(getStatus({profileId,ownerId,pageNumber}))
    }

    return <div style={{paddingLeft: '4rem', paddingRight: '4rem'}}>

        {isOwner && <Card sx={{display: 'flex', padding: '1rem', mt: '4rem'}}>
                        <Avatar src={profile.photos ? profile.photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white', width: 36, height: 36}}/>
                        <Button  sx={{bgcolor: '#e7e7e7',borderRadius:'20px'}} onClick={handleOpenAnythingNews} fullWidth variant={'string'}>Anything news?</Button>
                    </Card>}

            <Typography variant="h5" component="h5" sx={{display:'flex' ,mt:'1rem',mb:'1rem',alignItems:'center'}}> Publications <b style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.statusCount}</b></Typography>

        <div style={{ height: "100%", overflow:"hidden"}}>
                <InfiniteScroll
                    dataLength={profile.status.length}
                    next={fetchMoreData}
                    hasMore={profile.status.length < profile.statusCount}
                    loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
                >
                    {newStatusIsPending && <div style={{overflow:"hidden", display:'flex',justifyContent:'center',alignItems:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}

                    {profile.status.map(s =>
                            <StatusMedia key={s._id} isOwner={isOwner} token={token} showComments={showComments} liked={liked}
                                         disliked={disliked} profileFollow={profileFollow} newComment={newComment}
                                         profileUnfollow={profileUnfollow} ownerId={ownerId} ownerPhoto={ownerPhoto}
                                         profile={profile} status={s} handleCurrentImage={handleCurrentImage}/>
                    )}
                </InfiniteScroll>
        </div>
            <AnythingNews open={openAnythingNews} handleCloseAnythingNews={handleCloseAnythingNews} profile={profile} isOwner={isOwner} updateMyStatus={updateMyStatus}/>
    </div>
}

export default Status