import React from 'react';
import {Avatar, Typography} from "@mui/material";
import styled from "@emotion/styled";
import Badge from "@mui/material/Badge";
import dateFormat from "dateformat";

const Conversation = ({conversation}) => {

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
    }))

    return (<>
        <div style={{display:'flex' ,alignItems:'center'}}>
            { conversation && conversation.members && conversation.members[0].isOnline
                ? <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar
                        src={conversation && conversation.members[0].photos ?conversation.members[0].photos.large : ''}
                        sx={{bgcolor: 'pink', border: '3px solid white', width: 55, height: 55, cursor: 'pointer'}}
                    />
                </StyledBadge>
                : <Avatar
                    src={conversation ? conversation.members[0].photos ?conversation.members[0].photos.large : '':''}
                    sx={{bgcolor: 'pink', border: '3px solid white', width: 55, height: 55, cursor: 'pointer'}}/>
            }
          
                 <div>
                {conversation && conversation.members[0].firstName +' '+ conversation.members[0].lastName }
                { conversation && conversation.members && !conversation.members[0].isOnline &&
                <Typography variant="body2" color="text.secondary" fontSize={'10px'}>
                    {dateFormat(conversation.members[0].updatedAt,'mmmm,dddd,h:MM')}
                </Typography>}
                </div>
                <Badge invisible={!conversation.isNotReadingCount} badgeContent={conversation.isNotReadingCount} sx={{ml:'2rem'}} color="error"/>
        </div>
    </>);
};

export default Conversation;