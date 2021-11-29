import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {Settings} from "@mui/icons-material";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Modal, TextField, Typography,} from "@mui/material";

const UpdateProfile = React.memo(({profile, updateMyProfile}) => {
    console.log('updatestatus rendered')

    const [open, setOpen] = React.useState(false)
    const [maxWidth, setMaxWidth] = React.useState('sm')
    const [fullWidth, setFullWidth] = React.useState(true)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            name: profile.name,
            phoneNumber: profile.contacts ? profile.contacts.phoneNumber : ''
        },
        onSubmit: values => {
            const data = {
                fullName: values.fullName, name: values.name, contacts: {phoneNumber: values.phoneNumber}
            }
            dispatch(updateMyProfile(data))
        }
    })

    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
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
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='contained' startIcon={<Settings/>} onClick={handleClickOpen}>
                profile settings
            </Button>
            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
                <DialogTitle>Profile settings</DialogTitle>
                <DialogContent>
                    <Box sx={{display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content',}}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField id='name' name='name' value={formik.values.name} onChange={formik.handleChange}
                                       label="name" variant="standard"/>
                            <br/>
                            <TextField id='fullName' name='fullName' value={formik.values.fullName}
                                       onChange={formik.handleChange} label="full name" variant="standard"/>
                            <br/>
                            <TextField id='phoneNumber' name='phoneNumber' value={formik.values.phoneNumber}
                                       onChange={formik.handleChange} label="phone number" variant="standard"/>
                            <br/><br/>
                            <Button type='submit' variant="outlined">change</Button>
                        </form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    </>
})

export default UpdateProfile