import React from 'react';
import {Avatar} from "@mui/material";

const Conversation = ({conversation}) => {

    return (
        <div style={{display:'flex' ,alignItems:'center', margin:'1rem'}}>
            <Avatar
                 src={conversation && conversation.members[0].photos ?conversation.members[0].photos.large : ''}
                sx={{bgcolor: 'pink', border: '3px solid white', width: 55, height: 55, cursor: 'pointer'}}
            />
            {conversation && conversation.members[0].name}
        </div>
    );
};

export default Conversation;