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
            firstName: profile.firstName,
            lastName: profile.lastName,
            phoneNumber: profile.contacts ? profile.contacts.phoneNumber : '',
            city: profile.city,
            maritalStatus: profile.maritalStatus,
            workPlace: profile.workPlace
        },
        onSubmit: values => {
            const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                contacts: {phoneNumber: values.phoneNumber},
                city: values.city,
                maritalStatus:values.maritalStatus,
                workPlace:values.workPlace,
            }
            dispatch(updateMyProfile(data))
        }
    })

    const handleClickOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            event.target.value,
        );
    };
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    return <>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant='contained' sx={{height:'35px',my:'0.5rem'}} size='small' startIcon={<Settings/>} onClick={handleClickOpen}>
                set profile
            </Button>
            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
                <DialogTitle>Profile settings</DialogTitle>
                <DialogContent>
                    <Box sx={{display: 'flex', flexDirection: 'column', m: 'auto', width: 'fit-content',}}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField id='firstName' name='firstName' value={formik.values.firstName} onChange={formik.handleChange}
                                       label="first name" variant="standard"/>
                            <br/>
                            <TextField id='lastName' name='lastName' value={formik.values.lastName}
                                       onChange={formik.handleChange} label="last name" variant="standard"/>
                            <br/>
                            <TextField id='phoneNumber' name='phoneNumber' value={formik.values.phoneNumber}
                                       onChange={formik.handleChange} label="phone number" variant="standard"/>
                            <br/>
                            <TextField id='city' name='city' value={formik.values.city}
                                       onChange={formik.handleChange} label="city" variant="standard"/>
                            <br/>
                            <TextField id='maritalStatus' name='maritalStatus' value={formik.values.maritalStatus}
                                       onChange={formik.handleChange} label="marital Status" variant="standard"/>
                            <br/>
                            <TextField id='workPlace' name='workPlace' value={formik.values.workPlace}
                                       onChange={formik.handleChange} label="work place" variant="standard"/>
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