import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import StatusForm from "./StatusForm";

function AnythingNews ({open,handleCloseAnythingNews,profile,isOwner,updateMyStatus,isOpenInput,setIsOpenInput}) {
    const [fullWidth, setFullWidth] = React.useState(true)
    const [maxWidth, setMaxWidth] = React.useState('sm')

    const handleMaxWidthChange = (event) => {
        setMaxWidth(event.target.value)
    };
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked)
    }

    return <>
        <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleCloseAnythingNews}>

        <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogTitle>Anything news?</DialogTitle>
            <Button onClick={handleCloseAnythingNews} startIcon={<CancelIcon color={'action'} fontSize={'large'}/>}/>
        </DialogActions>
        <DialogContent>
            <Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar src={profile.photos !==null? profile.photos.large : ''}
                            sx={{bgcolor: 'pink', border: '3px solid white', width: 36, height: 36}}/>
                    <Typography variant="h6" component="h6"> {profile.firstName + ' '}{profile.lastName} </Typography>
                </Box>
                {profile && <StatusForm setIsOpenInput={setIsOpenInput} isOpenInput={isOpenInput} updateMyStatus={updateMyStatus} handleCloseAnythingNews={handleCloseAnythingNews}/>}
            </Box>
        </DialogContent>
    </Dialog>
    </>
}

export default AnythingNews