import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {follow, getUsers, unfollow} from "../../State-management/UsersSlice";
import User from "./User";
import {Grid, Pagination} from "@mui/material";
import {useHistory} from "react-router-dom";
import {createNewConversation} from "../../Redux-middleware/initMessengerSocketMiddleware";

const Users = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSendMessage = (userId) => {
        dispatch(createNewConversation({ownerId,userId}))
        history.push('/messenger')
    }

    const ownerId = useSelector(state => state.profile.ownerId)
    const users = useSelector(state => state.users.users)
    const totalUsersCount = useSelector(state => state.users.totalUsersCount)
    const token = localStorage.getItem('x-auth-token')

    const paginationHandle = useCallback((e, page) => {
        dispatch(getUsers({pageSize: 10, pageNumber: page}))
    }, [users])

    useEffect(() => {
        dispatch(getUsers({pageSize: 10, pageNumber: 1}))
    }, [])

    return <>
        <Grid container spacing={2} sx={{mt: '1rem', display: 'flex', justifyContent: 'center'}}>
            <Pagination count={Math.ceil(totalUsersCount / 10)} size="large" onChange={paginationHandle}/>
        </Grid>
        <Grid container spacing={2} sx={{mt: '1rem', display: 'flex'}}>
            {users !== null && users.map(u =>
                <Grid item xs={12} xl={6} lg={6}  key={u._id}>
                <User user={u} handleSendMessage={handleSendMessage} follow={follow} unfollow={unfollow} token={token} ownerId={ownerId}/>
                </Grid>
            )}
        </Grid>
    </>
}

export default React.memo(Users)