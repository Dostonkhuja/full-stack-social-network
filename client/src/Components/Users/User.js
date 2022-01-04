import React from 'react';
import {Avatar, Card, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import FollowButton from "./FollowButton";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import EmailIcon from '@mui/icons-material/Email';

import dateFormat from "dateformat";

const User = ({user, follow, unfollow, token, handleSendMessage,ownerId,handleCloseAllFollowers}) => {
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
            <Card sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', padding: '1rem'}}>
                <Link to={`/profile/${user._id}`} style={{textDecoration:'none'}} onClick={()=> handleCloseAllFollowers && handleCloseAllFollowers()}>
                    { user.isOnline
                        ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            src={user.photos ? user.photos.large : ''}
                            sx={{bgcolor: 'pink', width: 100 , height: 100, cursor: 'pointer'}}
                        />
                        
                    </StyledBadge>
                        : <div style={{display:"flex",alignItems:'center',flexDirection:'column'}}>
                            <Avatar
                                src={user.photos ? user.photos.large : ''}
                                sx={{bgcolor: 'pink', width: 100, height: 100, cursor: 'pointer'}}
                            />
                            <Typography variant="body2" color="text.secondary">
                                {dateFormat(user.updatedAt,'dd,mmm,hh:MM')}
                            </Typography>
                        </div>
                    }
                </Link>
                <div style={{
                    minWidth: '200px',
                    display: 'flex',
                    justifayContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {user.firstName + ' '}{user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user.email}
                    </Typography>
                    {token && <FollowButton user={user} follow={follow} unfollow={unfollow} token={token} ownerId={ownerId}/>}

                </div>
                {token &&
                    <div onClick={()=>ownerId !== user._id && handleSendMessage(user._id)} style={{cursor:'pointer'}}>
                    <EmailIcon color={ownerId !== user._id ? 'primary':'disabled'}/>
                    </div>}
            </Card>
    )
}

export default React.memo(User);