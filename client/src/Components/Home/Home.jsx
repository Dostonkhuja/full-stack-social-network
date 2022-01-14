import {useEffect, useState} from 'react'
import {useDispatch, useSelector,} from 'react-redux'
import {useHistory} from "react-router-dom";
import {
    dislikedHomePage,
    getStatusForHome,
    homeFollow,
    homeUnfollow,
    likedHomePage,
    newCommentHomeStatus,
    setStatusToNull,
    showCommentsHomeStatus,
    updateMyStatusHome
} from '../../State-management/HomeSlice'
import InfiniteScroll from "react-infinite-scroll-component";
import Lightbox from 'react-image-lightbox';
import CircularProgress from '@mui/material/CircularProgress';
import StatusMedia from '../Profile/MyProfile/status/Status-media/StatusMedia'
import Grid from '@mui/material/Grid';
import AnythingNews from "../Profile/MyProfile/status/anything-news/AnythingNews";
import {Avatar, Button, Card} from "@mui/material";
import {getAuthMe} from "../../State-management/ProfileSlice";
import {setCurrentPage} from '../../State-management/AppSlice'

const Home = ()=> {
    const dispatch = useDispatch()
    const history = useHistory()

    const [pageNumber,setPageNubmer] = useState(2)
    const [currentImage, setCurrentImage] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [openAnythingNews, setOpenAnythingNews] = useState(false)
    const handleOpenAnythingNews = () => {setOpenAnythingNews(true)}
    const handleCloseAnythingNews = () => {setOpenAnythingNews(false)}

    const status = useSelector(state=> state.home.status)
    const token = localStorage.getItem('x-auth-token')
    const isOwner = useSelector(state => state.profile.isOwner)
    const ownerPorifle = useSelector((state) => state.profile.ownerProfile)
    const ownerId = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile._id : '')
    const ownerPhoto = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile.photos.large : null)
    
    const fetchMoreData = () => {
        if (pageNumber > 1){
            setPageNubmer(pageNumber + 1)
            dispatch(getStatusForHome({ownerId,pageNumber}))
        }
    }

    const handleCurrentImage = (key,statusPhoto) => {
        if(statusPhoto){
            setCurrentImage(statusPhoto)
            setIsOpen(true)
        }
    }

    useEffect(()=> {
        if(token){
            dispatch(setCurrentPage(1))
            if(!ownerPorifle){
            dispatch(getAuthMe())
            }
        }else{
            history.push('/signIn')
        }
        return ()=> {
            dispatch(setStatusToNull())
            setPageNubmer(2)
        }
    },[])

    useEffect(()=> {
        if (ownerId!==''&&status===null){
            setPageNubmer(pageNumber + 1)
             dispatch(getStatusForHome({ownerId,pageNumber}))
        }
    },[ownerId,status])
    
  
    return <>
    {isOpen && (<Lightbox mainSrc={currentImage} onCloseRequest={() => setIsOpen(false)}/>)}
    <Grid item xs={11} sx={{display:'flex',justifyContent:'center',flexWrap:'wrap',pr:'3rem'}}>
        <Grid item xs={7}>
            {<Card sx={{display: 'flex', padding: '1rem', mt: '4rem'}}>
                        <Avatar src={ownerPorifle && ownerPorifle.photos ? ownerPorifle.photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white', width: 36, height: 36}}/>
                        <Button  sx={{bgcolor: '#e7e7e7',borderRadius:'20px'}} onClick={handleOpenAnythingNews} fullWidth variant={'string'}>Anything news?</Button>
                    </Card>}
        </Grid>
    </Grid>

    {ownerPorifle && <AnythingNews open={openAnythingNews} handleCloseAnythingNews={handleCloseAnythingNews} profile={ownerPorifle} isOwner={isOwner} updateMyStatus={updateMyStatusHome}/>}
          
           {status && 
            <div>
                <InfiniteScroll
                    dataLength={status.length}
                    next={fetchMoreData}
                    hasMore={status.length <56}
                    loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
                >
                    <Grid item xs={11} sx={{height: "100%", overflow:"hidden",display:'flex',pr:'3rem',justifyContent:'center',flexWrap:'wrap'}}>
                    {status.map(s =>
                         <Grid item xs={7} key={s._id}>
                            <StatusMedia key={s._id} isOwner={isOwner} token={token} showComments={showCommentsHomeStatus} liked={likedHomePage}
                                         disliked={dislikedHomePage} profileFollow={homeFollow} newComment={newCommentHomeStatus}
                                         profileUnfollow={homeUnfollow} ownerId={ownerId} ownerPhoto={ownerPhoto}
                                         profile={s.user} status={s} handleCurrentImage={handleCurrentImage}/>
                          </Grid>
                    )}
                    </Grid>
                </InfiniteScroll>    
            </div>}
        </>
}

export default Home
