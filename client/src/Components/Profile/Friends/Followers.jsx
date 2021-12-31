import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Avatar, Button} from "@mui/material";
import {Link} from "react-router-dom";

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
    )
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

export default function Friends({profile,handleTabChange}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Followers"/>
                    <Tab label="Followed"/>
                </Tabs>
            </Box>
                <div>
            <TabPanel value={value} index={0}>
                    <div style={{display:'flex',color:'#1a1a1a',alignItems:'center',justifyContent:'space-between'}}>
                        <Typography>
                            <b>followers</b>
                            <span style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.followedCount}</span>
                        </Typography>
                        <Button onClick={()=>handleTabChange('',1)}>All followers</Button>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, 110px)',justifyContent:'space-between'}}>
                        {profile.followed.map(f=> <div key={f._id}>
                            <Link to={`/profile/${f._id}`} style={{textDecoration:'none'}}>
                                <div style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:'0.5rem',marginRight:'0.5rem'}}>
                                    <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                                            sx={{bgcolor: 'pink', width: 100, height: 100, borderRadius:'1rem', cursor: 'pointer'}}/>
                                    <Typography fontSize={16} sx={{mt:"5px",color:'#000000'}}>
                                        <span>{f.firstName + ' '}</span>
                                        <span>{f.lastName.length > 3 ? f.lastName.substring(0,3) + '...': f.lastName}</span>
                                    </Typography>
                                </div>
                            </Link>
                        </div>)}
                </div>
                </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{display:'flex',color:'#1a1a1a',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography>
                        <b>followed</b>
                        <span style={{color:'#bdbdbd',marginLeft:'0.5rem'}}>{profile.followingCount}</span>
                    </Typography>
                    <Button onClick={()=>handleTabChange('',2)}>All followed</Button>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, 110px)',justifyContent:'space-between'}}>
                    {profile.following.map(f=><div key={f._id}>
                        <Link to={`/profile/${f._id}`} style={{textDecoration:'none'}}>
                            <div style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:'0.5rem',marginRight:'0.5rem'}}>
                                <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                                        sx={{bgcolor: 'pink', width: 100, height: 100, borderRadius:'1rem', cursor: 'pointer'}}/>

                                <Typography fontSize={16} sx={{mt:"5px",color:'#000000'}}>
                                    <span>{f.firstName + ' '}</span>
                                    {/*<span>{f.lastName}</span>*/}
                                    <span>{f.lastName.length > 3 ? f.lastName.substring(0,3) + '...': f.lastName}</span>
                                </Typography>
                            </div>
                        </Link>
                    </div>)}
                </div>
            </TabPanel>
            </div>
        </>
    )
}
