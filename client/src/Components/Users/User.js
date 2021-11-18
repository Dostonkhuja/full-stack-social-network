import React from 'react';
import {Avatar, Card, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import FollowButton from "./FollowButton";

const User = ({user, follow, unfollow, token, handleSendMessage}) => {

    return (
        <Grid item xs={12} xl={6} lg={6} sx={{}}>
            <Card sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '1rem'}}>
                <Link to={`/profile/${user._id}`}>
                    <Avatar
                        src={user.photos ? user.photos.large : ''}
                        sx={{bgcolor: 'pink', width: 116, height: 116, cursor: 'pointer'}}
                    />
                </Link>
                {user.isOnline ? <p style={{color:'green'}}>online</p>:''}
                <div style={{
                    minWidth: '230px',
                    display: 'flex',
                    justifayContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                    {token && <FollowButton user={user} follow={follow} unfollow={unfollow}/>}
                </div>

                <button onClick={()=> {handleSendMessage(user._id)}}>send message</button>
            </Card>
        </Grid>
    )
}

export default React.memo(User);