import React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {Button} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimeAgo from "timeago-react";
import {Link} from "react-router-dom";

const Guest = ({guest}) => {
    return <>
        <Link to={`/profile/${guest.guest._id}`} style={{textDecoration:'none'}}>
            <Card fullwidth={'true'} sx={{mt:'3rem',pb:2,boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',borderRadius:'10px'}}>
                <CardHeader
                    avatar={<Avatar src={guest.guest.photos ? guest.guest.photos.large : ''} sx={{bgcolor: 'pink', border: '3px solid white'}}/>}
                    action={<Button disabled={true} sx={{cursor:'default'}}> <MoreVertIcon /> </Button>}
                    title={guest.guest.firstName + ' ' + guest.guest.lastName}
                    subheader={<TimeAgo style={{color:'#777575'}} datetime={guest.createdAt} locale='vi'/>}/>
            </Card>
        </Link>
        </>
}

export default Guest;