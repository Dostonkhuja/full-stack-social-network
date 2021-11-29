import React from 'react';
import {Avatar, Card, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import FollowButton from "./FollowButton";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";

const User = ({user, follow, unfollow, token, handleSendMessage,ownerId}) => {

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <Grid item xs={12} xl={6} lg={6} sx={{}}>
            <Card sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '1rem'}}>
                <Link to={`/profile/${user._id}`}>
                    { user.isOnline
                        ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            src={user.photos ? user.photos.large : ''}
                            sx={{bgcolor: 'pink', width: 116, height: 116, cursor: 'pointer'}}
                        />
                    </StyledBadge>
                        : <Avatar
                            src={user.photos ? user.photos.large : ''}
                            sx={{bgcolor: 'pink', width: 116, height: 116, cursor: 'pointer'}}
                        />
                    }
                </Link>
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
                    {token && ownerId !== user._id &&<FollowButton user={user} follow={follow} unfollow={unfollow}/>}
                </div>
                { ownerId !== user._id && <button onClick={()=> {handleSendMessage(user._id)}}>send message</button>}

            </Card>
        </Grid>
    )
}

export default React.memo(User);