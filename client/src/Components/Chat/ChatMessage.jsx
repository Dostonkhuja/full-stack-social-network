import React from 'react';
import {Avatar, Typography} from "@mui/material";
import TimeAgo from "timeago-react";
import {StyledBadge} from "../../Common/StyedBadge";

const ChatMessage = ({message,ownerId}) => {
    return <>
            <div key={message._id} style={message.sender._id === ownerId
                ? {display: 'flex', justifyContent: 'flex-end', margin: '0.5rem'}
                : {display: 'flex', justifyContent: 'flex-start'}}>

                {message.sender.isOnline
                    ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        variant="dot"
                    >
                        <Avatar
                            src={message.sender.photos.large ? message.sender.photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white', width: 35, height: 35}}
                        />
                    </StyledBadge>
                    : <Avatar
                        src={message.sender.photos.large ? message.sender.photos.large : ''}
                        sx={{bgcolor: 'pink', border: '3px solid white', width: 35, height: 35}}/>
                }
                <div>
                    <div style={message.sender._id === ownerId
                        ? {backgroundColor: '#0084ff', color: 'white',borderRadius:'10px',minWidth:'120px',padding:'0.5rem',margin:'0.5rem',justifyContent:'center'}
                        : {backgroundColor: '#e4e6eb', color: 'black',borderRadius:'10px',minWidth:'120px',padding:'0.5rem',margin:'0.5rem',justifyContent:'center'}}>
                        <Typography variant="p" fontSize={'12px'} sx={{display:'block'}}>
                            <b>{message.sender.firstName + ' ' + message.sender.lastName }</b>
                        </Typography>
                        <Typography variant="p" fontSize={'16px'}>
                            {message.text}
                        </Typography>
                    </div>
                    <TimeAgo style={{color:'#777575'}} datetime={message.createdAt} locale='vi'/>
                </div>
            </div>
        </>
}

export default ChatMessage