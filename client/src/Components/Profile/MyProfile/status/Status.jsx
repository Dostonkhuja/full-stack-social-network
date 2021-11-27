import React from "react";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import StatusForm from "./StatusForm";
import Box from "@mui/material/Box";
import CancelIcon from '@mui/icons-material/Cancel';

const Status = React.memo(({isOwner, profile, updateMyStatus}) => {

    const [open, setOpen] = React.useState(false)
    const [fullWidth, setFullWidth] = React.useState(true)
    const [maxWidth, setMaxWidth] = React.useState('sm')

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    return <>
            {isOwner &&
                <Card sx={{display:'flex' ,padding:'1rem'}}>
                <Avatar
                    src={profile.photos ? profile.photos.large : ''}
                    sx={{bgcolor: 'pink', border: '3px solid white', width: 36, height: 36}}
                />
                <Button onClick={handleClickOpen} fullWidth variant={'string'}>
                    Anything news?
                </Button>
                </Card>
            }
                {profile.status  !==null && profile.status.map(s=>
                    <Card key={s._id} sx={{backgroundColor: '#d0d0d0',mt:'1rem'}}>
                        <CardContent>
                            <Avatar
                                src={profile.photos ? profile.photos.large : ''}
                                sx={{bgcolor: 'pink', border: '3px solid white', width: 36, height: 36}}
                            />
                    <Typography variant="body2">
                        {s.text !==null ? s.text : ""}
                    </Typography>
                    <img src={s.photoFile ? s.photoFile:''} style={{width:'250px'}} alt=""/>
                        </CardContent>
                    </Card>
                )}

        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
        >
            <DialogActions sx={{display:'flex',justifyContent:'space-between'}}>
                <DialogTitle>Anything news?</DialogTitle>
                <Button onClick={handleClose} startIcon={<CancelIcon color={'action'} fontSize={'large'}/>}/>
            </DialogActions>
            <DialogContent>
                <Box>
                    <Box sx={{display:'flex',alignItems:'center'}}>
                    <Avatar
                        src={profile.photos ? profile.photos.large : ''}
                        sx={{bgcolor: 'pink', border: '3px solid white', width: 36, height: 36}}
                    />
                    <Typography variant="h6" component="h6">
                        {profile.name}
                    </Typography>
                    </Box>
                    {isOwner && <StatusForm updateMyStatus={updateMyStatus}/>}
                </Box>
            </DialogContent>
        </Dialog>
    </>
})

export default Status