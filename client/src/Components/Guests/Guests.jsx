import React, {useEffect, useState} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import {getGuests} from "../../Redux-middleware/initGuestsMiddleware";
import {setGuestsDefoult} from "../../State-management/GuestsSlice";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {Button, Grid} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimeAgo from "timeago-react";
import {Link} from "react-router-dom";
import Card from "@mui/material/Card";

const Guests = () => {
    const dispatch = useDispatch()

    const [pageNumber,setPageNubmer] = useState(1)
    const pageSize=10

    const guests = useSelector(state=> state.guests.guests)
    const allGuestCount = useSelector(state=> state.guests.allGuestCount)
    const ownerId = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile._id : '')

    const fetchMoreData = () => {
        if (pageNumber > 1){
            setPageNubmer(pageNumber + 1)
            dispatch(getGuests({ownerId,pageNumber,pageSize}))
        }
    }

    useEffect(()=> {
        if (allGuestCount !== null && ownerId !=='' && guests.length === 0){
            setPageNubmer(pageNumber + 1)
            dispatch(getGuests({ownerId,pageNumber,pageSize}))
        }

        return ()=> {
            setPageNubmer(1)
            dispatch(setGuestsDefoult())
        }
    },[ownerId,allGuestCount])

    return (
        <InfiniteScroll
            dataLength={guests.length}
            next={fetchMoreData}
            hasMore={guests.length < allGuestCount}
            loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
        >
            <Grid container xs={11} sx={{display:'flex',justifyContent:'center'}}>
            {guests.length !==0 && guests.map(g=>
                <Grid item xs={7} sx={{display:'inline'}}>
                    <Link to={`/profile/${g.guest._id}`} style={{textDecoration:'none'}}>
                <Card fullwidth={'true'} sx={{mt:'3rem',pb:2,boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
                    <CardHeader
                        avatar={<Avatar src={g.guest.photos ? g.guest.photos.large : ''} sx={{bgcolor: 'pink', border: '3px solid white'}}/>}
                        action={<Button disabled={true} sx={{cursor:'default'}}> <MoreVertIcon /> </Button>}
                        title={g.guest.firstName + ' ' + g.guest.lastName}
                        subheader={<TimeAgo style={{color:'#777575'}} datetime={g.createdAt} locale='vi'/>}/>
                </Card>
                    </Link>
                </Grid>
            )}
            </Grid>
        </InfiniteScroll>
    );
};

export default Guests;