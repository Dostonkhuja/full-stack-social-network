import React, {useEffect, useState} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import {useDispatch, useSelector} from "react-redux";
import {getGuests} from "../../Redux-middleware/initGuestsMiddleware";
import {setGuestsDefoult} from "../../State-management/GuestsSlice";
import {Grid} from "@mui/material";
import Guest from "./Guest";
import {useHistory} from "react-router-dom";

const Guests = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [pageNumber,setPageNubmer] = useState(1)
    const pageSize=10

    const guests = useSelector(state=> state.guests.guests)
    const allGuestCount = useSelector(state=> state.guests.allGuestCount)
    const ownerId = useSelector(state => state.profile.ownerProfile ? state.profile.ownerProfile._id : '')
    const token = localStorage.getItem('x-auth-token')

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

        if(!token){
            history.push('/signIn')
        }

        return ()=> {
            setPageNubmer(1)
            dispatch(setGuestsDefoult())
        }
    },[ownerId,allGuestCount])

    return (<Grid item xs={12}>
        <InfiniteScroll
            dataLength={guests.length}
            next={fetchMoreData}
            hasMore={guests.length < allGuestCount}
            loader={<div style={{ height: "100%", overflow:"hidden", display:'flex',justifyContent:'center',marginTop:'0.5rem'}}> <CircularProgress/> </div>}
        >
            <Grid container sx={{display:'flex',justifyContent:'center'}}>
                <Grid item xs={6}>
            {guests.length !==0 && guests.map(g=>
                <Grid item xs={6} sx={{display:'inline'}} key={g._id}>
                    <Guest guest={g}/>
                </Grid>
            )}
                </Grid>
            </Grid>
        </InfiniteScroll>
    </Grid>)
}

export default Guests