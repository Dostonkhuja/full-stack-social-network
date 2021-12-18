import React, {useEffect, useState} from 'react';
import {defaultAllFollowers, getFollowed, getFollowers, isOwnerScope} from "../../../State-management/AllFollowersSlice";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import {useHistory} from "react-router-dom";
import {Grid} from "@mui/material";
import User from "../../Users/User";
import {follow, unfollow} from "../../../State-management/UsersSlice";
import {createNewConversation} from "../../../Redux-middleware/initMessengerSocketMiddleware";

const AllFollowers = ({userId,followedCount,onFollowers,followingCount}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [pageNumberFollowers,setPageNumberFollowers] = useState(1)
    const [pageNumberFollowed,setPageNumberFollowed] = useState(1)
    let pageSize = 10

    const followers = useSelector(state=> state.allFollowers.followers)
    const followed = useSelector(state=> state.allFollowers.followed)
    const ownerId = useSelector(state => state.profile.ownerId)
    const token = localStorage.getItem('x-auth-token')

    const fetchMoreData = () => {
        if(onFollowers){
            ownerId === userId && dispatch(isOwnerScope(true))
            setPageNumberFollowers(pageNumberFollowers + 1)
            dispatch(getFollowers({userId,pageSize,pageNumberFollowers,ownerId}))
        }else{
            ownerId === userId && dispatch(isOwnerScope(true))
            setPageNumberFollowed(pageNumberFollowed + 1)
            dispatch(getFollowed({userId,pageSize,pageNumberFollowed,ownerId}))
        }
    }

    const handleSendMessage = (userId) => {
        dispatch(createNewConversation({ownerId,userId}))
        history.push('/messenger')
    }

    useEffect(()=> {
        return ()=>{
            dispatch(defaultAllFollowers())
            dispatch(isOwnerScope(false))
        }
    },[])

    return (
        <div>
            <InfiniteScroll
                dataLength={onFollowers ? followers.length : followed.length}
                next={fetchMoreData}
                hasMore={onFollowers ? followers.length < followedCount : followed.length < followingCount}
                loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
            >
                <Grid container spacing={2} sx={{mt: '1rem', display: 'flex'}}>
                    {onFollowers && followers.length !== 0 && followers.map(u => <User user={u} handleSendMessage={handleSendMessage} follow={follow} unfollow={unfollow} token={token} key={u._id} ownerId={ownerId}/>)}
                    {!onFollowers && followed.length !== 0 && followed.map(u => <User user={u} handleSendMessage={handleSendMessage} follow={follow} unfollow={unfollow} token={token} key={u._id} ownerId={ownerId}/>)}
                </Grid>
            </InfiniteScroll>
        </div>
    )
}

export default AllFollowers;