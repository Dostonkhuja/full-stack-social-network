import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Avatar, Grid} from "@mui/material";

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

export default function Friends({profile}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Followers"/>
                    <Tab label="Followed"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {profile !==null && profile.followed.map(f=><div key={f._id}>
                    <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                            sx={{bgcolor: 'pink', width: 116, height: 116, borderRadius:'1rem', cursor: 'pointer'}}/>
                    {f.name}
                </div>)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div style={{display:'flex',justifyContent:'space-between', flexWrap:'wrap', padding:'1rem'}}>
                    {profile !==null && profile.following.map(f=><div key={f._id}>
                        <Avatar variant="square"  src={f.photos ? f.photos.large : ''}
                                sx={{bgcolor: 'pink', width: 116, height: 116, borderRadius:'1rem', cursor: 'pointer'}}/>
                        {f.name}
                    </div>)}
                </div>
            </TabPanel>
        </Box>
    );
}
