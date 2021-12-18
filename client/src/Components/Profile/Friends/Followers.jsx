import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Avatar, Button} from "@mui/material";

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
                    <div>{children}</div>
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

export default function Friends({profile,openAllFollowers,setOpenAllFollowers,setOnFollowers}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
        setOpenAllFollowers(false)
        setOnFollowers(true)
    };

    const handleAllFollowers = () => {
        setOpenAllFollowers(true)
        setOnFollowers(true)
    }

    const handleAllFollowed = () => {
        setOpenAllFollowers(true)
        setOnFollowers(false)
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Followers"/>
                    <Tab label="Followed"/>
                </Tabs>
            </Box>
            {!openAllFollowers &&
                <div style={{height:'470px'}}>
            <TabPanel value={value} index={0}>
                {!openAllFollowers && <div>
                    <div style={{display:'flex',color:'#bdbdbd',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography>
                            followers
                            <span style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.followedCount}</span>
                        </Typography>
                        <Button onClick={handleAllFollowers}>All followers</Button>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between', flexWrap:'wrap', padding:'1rem',alignItems:'center'}}>
                        {profile !==null && profile.followed.map(f=> <div key={f._id} style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                                <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                                        sx={{bgcolor: 'pink', width: 100, height: 100, borderRadius:'1rem', cursor: 'pointer'}}/>
                               <span> {f.name}</span>
                            </div>)}
                    </div>
                </div>}
                </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                <div style={{display:'flex',color:'#bdbdbd',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography>
                        followed
                        <span style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.followingCount}</span>
                    </Typography>
                    <Button onClick={handleAllFollowed}>All followed</Button>
                </div>
                <div style={{display:'flex',justifyContent:'space-between', flexWrap:'wrap', padding:'1rem',alignItems:'center'}}>
                    {profile !==null && profile.following.map(f=><div key={f._id} style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:'0.5rem'}}>
                        <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                                sx={{bgcolor: 'pink', width: 100, height: 100, borderRadius:'1rem', cursor: 'pointer'}}/>
                        <span>{f.name}</span>
                    </div>)}
                </div>
                </div>
            </TabPanel>
            </div>
            }
        </>
    );
}
