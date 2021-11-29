import React from 'react';
import Avatar from "@mui/material/Avatar";

const Commenty = ({comment}) => {
    return (
        <div>
            <div style={{paddingLeft: '1rem',paddingRight: '1rem',marginTop:"1rem", display: 'flex',}}>
                <Avatar
                    src={comment.photos ? comment.photos.large : ''}
                    sx={{bgcolor: 'pink', border: '3px solid white'}}
                />
                <div style={{borderRadius: "20px", backgroundColor: '#f0f2f5', border: 'none',
                    outline: 'none', fontSize: '16px', resize: 'none', padding: '1rem'}}>
                    <div>
                        <b>{comment.user.name}</b>
                    </div>
                    {comment.comment}
                </div>
            </div>
            <div style={{fontSize:'12px',marginLeft:'4rem',marginTop:'0.3rem'}}>
                <i>{comment.createdAt}</i>
            </div>
        </div>
    )
}

export default Commenty