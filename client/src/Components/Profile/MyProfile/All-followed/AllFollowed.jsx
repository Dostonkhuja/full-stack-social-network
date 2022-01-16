import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import {useHistory} from "react-router-dom";
import {Grid} from "@mui/material";
import User from "../../../Users/User";
import {follow, unfollow} from "../../../../State-management/UsersSlice";
import {createNewConversation} from "../../../../Redux-middleware/initMessengerSocketMiddleware";

const AllFollowed = ({defaultAllFollowers, getFollowed, isOwnerScope,ownerId,token,userId,followingCount,handleCloseAllFollowers}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [pageNumberFollowed,setPageNumberFollowed] = useState(1)
    let pageSize = 10

    const followed = useSelector(state=> state.allFollowers.followed)

    const fetchMoreData = () => {
        if (pageNumberFollowed > 1){
            setPageNumberFollowed(pageNumberFollowed + 1)
            dispatch(getFollowed({userId,pageSize,pageNumberFollowed,ownerId}))
        }
    }

    const handleSendMessage = (userId) => {
        dispatch(createNewConversation({ownerId,userId}))
        history.push('/messenger')
    }

    useEffect(()=> {
        ownerId === userId && dispatch(isOwnerScope(true))
        if (followed.length === 0){
            setPageNumberFollowed(pageNumberFollowed + 1)
            dispatch(getFollowed({userId,pageSize,pageNumberFollowed,ownerId}))
        }
        return ()=>{
            dispatch(defaultAllFollowers())
            dispatch(isOwnerScope(false))
        }
    },[])

    if(followed.length === 0)
        return <div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',alignItems:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>

    return (
        <div>
            <InfiniteScroll
                dataLength={followed.length}
                next={fetchMoreData}
                hasMore={followed.length < followingCount}
                loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'space-between',flexWrap:'wrap',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
            >
                    <Grid container spacing={2} sx={{py:'1rem'}}>
                    {followed.map(u => <Grid item xs={6} key={u._id}>
                        <User user={u}  handleSendMessage={handleSendMessage} handleCloseAllFollowers={handleCloseAllFollowers} follow={follow} unfollow={unfollow} token={token} ownerId={ownerId} />
                        </Grid>)}
                    </Grid>
            </InfiniteScroll>
        </div>
    )
}

export default AllFollowed;