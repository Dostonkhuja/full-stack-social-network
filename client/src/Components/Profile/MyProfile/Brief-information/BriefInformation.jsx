import React from 'react';
import {Typography} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const BriefInformation = ({profile}) => {
    return <div>
        <div style={{display:'flex',color:'#1a1a1a',alignItems:'center',justifyContent:'space-between',paddingLeft:'1.5rem',paddingBottom:'1rem'}}>
            <Typography>
                <b>brief information</b>
            </Typography>
        </div>
        <Typography  sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
            <LocationCityIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/><span style={{color:'#707070',marginRight:'0.5rem'}}>city:</span> { profile.city}
        </Typography>
        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
            <FavoriteIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/><span style={{color:'#707070',marginRight:'0.5rem'}}>marital status:</span>  {profile.maritalStatus}
        </Typography>
        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
            <WorkIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/> <span style={{color:'#707070',marginRight:'0.5rem'}}>work Place:</span> {profile.workPlace}
        </Typography>
        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
            <EmailIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/> <span style={{color:'#707070',marginRight:'0.5rem'}}>email:</span> {profile.email}
        </Typography>
        <Typography sx={{marginLeft:'2.5rem',display:'flex',alignItems:'center'}}>
            <PhoneInTalkIcon sx={{pt:'-0.5rem',color:'#707070',mr:'0.5rem'}}/> <span style={{color:'#707070',marginRight:'0.5rem'}}>contacts:</span> {profile.contacts && profile.contacts.phoneNumber}
        </Typography>
    </div>
}

export default BriefInformation;