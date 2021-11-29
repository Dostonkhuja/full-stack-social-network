import React from "react";
import Box from "@mui/material/Box";
import StatusForm from "./StatusForm";
import StatusMedia from './StatusMedia'
import CancelIcon from '@mui/icons-material/Cancel';
import {Avatar, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const Status = React.memo(({isOwner, profile, updateMyStatus}) => {

    const [open, setOpen] = React.useState(false)
    const [fullWidth, setFullWidth] = React.useState(true)
    const [maxWidth, setMaxWidth] = React.useState('sm')

    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value,);
    };
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    return <div style={{paddingLeft: '4rem', paddingRight: '4rem'}}>
        {isOwner && <Card sx={{display: 'flex', padding: '1rem', mt: '4rem'}}>
                        <Avatar src={profile.photos ? profile.photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white', width: 36, height: 36}}/>
                        <Button onClick={handleClickOpen} fullWidth variant={'string'}>Anything news?</Button>
                    </Card>}

            <Typography variant="h5" component="h5" sx={{display:'flex' ,mt:'1rem',mb:'1rem'}}> Publications</Typography>

                {profile.status  !==null && profile.status.map(s=> <StatusMedia key={s._id} profile={profile} status={s} />)}

        <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>

            <DialogActions sx={{display:'flex',justifyContent:'space-between'}}>
                <DialogTitle>Anything news?</DialogTitle>
                <Button onClick={handleClose} startIcon={<CancelIcon color={'action'} fontSize={'large'}/>}/>
            </DialogActions>

            <DialogContent>
                <Box>
                    <Box sx={{display:'flex',alignItems:'center'}}>
                        <Avatar src={profile.photos ? profile.photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white',width:36, height: 36}}/>
                    <Typography variant="h6" component="h6"> {profile.name} </Typography>
                    </Box>
                    {isOwner && <StatusForm updateMyStatus={updateMyStatus}/>}
                </Box>
            </DialogContent>
        </Dialog>
    </div>
})

export default Status