import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import {useHistory} from "react-router-dom";
import {Grid} from "@mui/material";
import User from "../../../Users/User";
import {follow, unfollow} from "../../../../State-management/UsersSlice";
import {createNewConversation} from "../../../../Redux-middleware/initMessengerSocketMiddleware";

const AllFollowers = ({defaultAllFollowers,getFollowers,userId,followedCount,ownerId,token}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [pageNumberFollowers,setPageNumberFollowers] = useState(1)
    let pageSize = 10

    const followers = useSelector(state=> state.allFollowers.followers)

    const fetchMoreData = () => {
        if (pageNumberFollowers > 1){
            setPageNumberFollowers(pageNumberFollowers + 1)
            dispatch(getFollowers({userId,pageSize,pageNumberFollowers,ownerId}))
        }
    }

    const handleSendMessage = (userId) => {
        dispatch(createNewConversation({ownerId,userId}))
        history.push('/messenger')
    }

    useEffect(()=> {
        if (followers.length === 0){
             setPageNumberFollowers(pageNumberFollowers + 1)
            dispatch(getFollowers({userId,pageSize,pageNumberFollowers,ownerId}))
        }
        return ()=> dispatch(defaultAllFollowers())
    },[])

    return (
        <div>
            <InfiniteScroll
                dataLength={followers.length}
                next={fetchMoreData}
                hasMore={followers.length < followedCount}
                loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'space-between',flexWrap:'wrap',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
            >
                    <Grid container spacing={2} sx={{py:'1rem'}}>
                    {followers.map(u => <Grid item xs={6}  key={u._id} >
                        <User user={u} handleSendMessage={handleSendMessage} follow={follow} unfollow={unfollow} token={token} ownerId={ownerId}/>
                    </Grid>)}
                    </Grid>
            </InfiniteScroll>
        </div>
    )
}

export default AllFollowers;