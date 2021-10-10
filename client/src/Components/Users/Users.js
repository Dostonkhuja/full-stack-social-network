import {useEffect} from "react";
import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {follow, getUsers, unfollow} from "../../State-management/UsersSlice";
import User from "./User";
import {Grid, Pagination} from "@mui/material";

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return <>
        <Grid container spacing={2} sx={{mt: '1rem',display:'flex',justifyContent:'center'}}>
            <Pagination count={10} size="large" />
        </Grid>
        <Grid container spacing={2} sx={{mt: '1rem',display:'flex'}}>
            {users !== null && users.map(u => <User user={u} follow={follow} unfollow={unfollow} key={u._id}/>)}
        </Grid>
    </>
}

export default React.memo(Users)