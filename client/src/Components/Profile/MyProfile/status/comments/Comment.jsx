import React from 'react';
import Avatar from "@mui/material/Avatar";
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
import vi from 'timeago.js/lib/lang/ru'

timeago.register('vi', vi);

const Commenty = ({comment}) => {
    return (
        <div>
            <div style={{paddingLeft: '1rem',paddingRight: '1rem',marginTop:"1rem", display: 'flex',}}>
                <Avatar
                    src={comment.user.photos ? comment.user.photos.large : ''}
                    sx={{bgcolor: 'pink', border: '3px solid white'}}
                />
                <div style={{borderRadius: "20px", backgroundColor: '#f0f2f5', border: 'none',
                    outline: 'none', fontSize: '16px', resize: 'none', padding: '1rem'}}>
                    <div>
                        <b>{comment.user.firstName +' '+ comment.user.lastName}</b>
                    </div>
                    {comment.comment}
                </div>
            </div>
            <div style={{fontSize:'12px',marginLeft:'4rem',marginTop:'0.3rem'}}>
                <i><TimeAgo style={{color:'#777575',fontSize:'14px'}} datetime={comment.createdAt} locale='vi'/></i>
            </div>
        </div>
    )
}

export default Commenty