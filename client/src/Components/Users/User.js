import React from 'react';
import {Avatar, Button, Card, Grid, Typography} from "@mui/material";
import {useDispatch} from "react-redux";

const User = ({user, follow,unfollow}) => {

    const dispatch = useDispatch()

    return (
        <Grid item xs={12} xl={6} lg={6} sx={{}}>
            <Card sx={{display: 'flex', justifyContent: 'space-around', flexWrap:'wrap', padding: '1rem'}}>
                <Avatar
                    src={user.photos ? user.photos.large : ''}
                    sx={{bgcolor: 'pink', width: 116, height: 116, cursor: 'pointer'}}
                />
                <div style={{minWidth:'230px',display:'flex',justifayContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                    {user.isFollow
                        ? <Button onClick={() => {dispatch(unfollow(user._id))}}
                                  variant="contained" color="success" sx={{mt: '1rem'}}>
                        unfollow
                    </Button>
                        :
                        <Button onClick={() => {dispatch(follow(user._id))}}
                                variant="contained" color="success" sx={{mt: '1rem'}}>
                            Follow
                        </Button>
                    }
                </div>
            </Card>
        </Grid>
    )
}

export default React.memo(User);