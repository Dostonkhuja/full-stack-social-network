import React from 'react';
import {Avatar} from "@mui/material";

const Friends = (profile) => {
    return (
        <div>
            <div style={{border:'1px solid',width:'40%'}}>
                <h2>Followed</h2>
                <div style={{display:'flex',justifyContent:'space-between', flexWrap:'wrap', padding:'1rem'}}>
                {profile !==null && profile.profile.following.map(f=><div key={f._id}>
                    <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                             sx={{bgcolor: 'pink', width: 136, height: 136, borderRadius:'1rem', cursor: 'pointer'}}/>
                    {f.name}
                </div>)}
                </div>
            </div>
        </div>
    );
};

export default Friends;