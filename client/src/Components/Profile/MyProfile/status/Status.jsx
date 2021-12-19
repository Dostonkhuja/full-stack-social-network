import React, {useState} from "react";
import Box from "@mui/material/Box";
import StatusForm from "./StatusForm";
import StatusMedia from './StatusMedia'
import CancelIcon from '@mui/icons-material/Cancel';
import {Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch} from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';


const Status = React.memo(({handleCurrentImage,getStatus,token,liked,disliked,ownerId,profileUnfollow,profileFollow,showComments,isOwner,ownerPhoto, profile, updateMyStatus}) => {

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false)
    const [fullWidth, setFullWidth] = React.useState(true)
    const [maxWidth, setMaxWidth] = React.useState('sm')

    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value,);
    };
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

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
                        <Button  sx={{bgcolor: '#e7e7e7',borderRadius:'20px'}} onClick={handleClickOpen} fullWidth variant={'string'}>Anything news?</Button>
                    </Card>}

            <Typography variant="h5" component="h5" sx={{display:'flex' ,mt:'1rem',mb:'1rem',alignItems:'center'}}> Publications <b style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.statusCount}</b></Typography>

        <div style={{ height: "100%", overflow:"hidden"}}>
                <InfiniteScroll
                    dataLength={profile.status.length}
                    next={fetchMoreData}
                    hasMore={profile.status.length < profile.statusCount}
                    loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
                >
                    {profile.status.map(s =>
                            <StatusMedia key={s._id} isOwner={isOwner} token={token} showComments={showComments} liked={liked}
                                         disliked={disliked} profileFollow={profileFollow}
                                         profileUnfollow={profileUnfollow} ownerId={ownerId} ownerPhoto={ownerPhoto}
                                         profile={profile} status={s} handleCurrentImage={handleCurrentImage}/>
                    )}
                </InfiniteScroll>
        </div>

        <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
            <DialogActions sx={{display:'flex',justifyContent:'space-between'}}>
                <DialogTitle>Anything news?</DialogTitle>
                <Button onClick={handleClose} startIcon={<CancelIcon color={'action'} fontSize={'large'}/>}/>
            </DialogActions>
            <DialogContent>
                <Box>
                    <Box sx={{display:'flex',alignItems:'center'}}>
                        <Avatar src={profile.photos ? profile.photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white',width:36, height: 36}}/>
                    <Typography variant="h6" component="h6"> {profile.name} </Typography>
                    </Box>
                    {isOwner && <StatusForm updateMyStatus={updateMyStatus} handleClose={handleClose}/>}
                </Box>
            </DialogContent>
        </Dialog>
    </div>
})

export default Status