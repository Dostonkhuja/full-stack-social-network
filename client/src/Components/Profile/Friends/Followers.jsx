import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Avatar, Button, Grid} from "@mui/material";
import AllFollowers from "../MyProfile/AllFollowers";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Friends({profile,openAllFollowers,setOpenAllFollowers}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setOpenAllFollowers(false)
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Followers"/>
                    <Tab label="Followed"/>
                </Tabs>
            </Box>
            {!openAllFollowers && <Box sx={{height:'550px'}}>
            <TabPanel value={value} index={0}>
                {!openAllFollowers && <div>
                    <Typography variant="h5" component="h5" sx={{display:'flex',color:'#bdbdbd',alignItems:'center',justifyContent:'space-between'}}>
                        <div>
                            followers
                            <span style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.followedCount}</span>
                        </div>
                        <Button onClick={()=>setOpenAllFollowers(true)}>All followers</Button>
                    </Typography>
                    <div style={{display:'flex',justifyContent:'space-between', flexWrap:'wrap', padding:'1rem',alignItems:'center'}}>
                        {profile !==null && profile.followed.map(f=>
                            <div key={f._id} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                                <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                                        sx={{bgcolor: 'pink', width: 116, height: 116, borderRadius:'1rem', cursor: 'pointer'}}/>
                                {f.name}
                            </div>)}
                    </div>
                </div>}
                </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                <Typography variant="h5" component="h5" sx={{display:'flex',color:'#bdbdbd',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                        followed
                        <span style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.followingCount}</span>
                    </div>
                    <Button >All followed</Button>
                </Typography>
                <div style={{display:'flex',justifyContent:'space-between', flexWrap:'wrap', padding:'1rem',alignItems:'center'}}>
                    {profile !==null && profile.following.map(f=><div key={f._id} style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:'0.5rem'}}>
                        <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                                sx={{bgcolor: 'pink', width: 116, height: 116, borderRadius:'1rem', cursor: 'pointer'}}/>
                        {f.name}
                    </div>)}
                </div>
                </div>
            </TabPanel>
            </Box>}
        </Box>
    );
}
