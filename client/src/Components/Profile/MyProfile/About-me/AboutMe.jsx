import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,} from "@mui/material";
import {aboutMe} from "../../../../State-management/ProfileSlice";

const AboutMe = React.memo(({profile}) => {
    const [open, setOpen] = React.useState(false)
    const [maxWidth, setMaxWidth] = React.useState('sm')
    const [fullWidth, setFullWidth] = React.useState(true)
    const [textLength, setTextLength] = React.useState(profile.aboutMe.length)

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {aboutMe: profile.aboutMe},
        onSubmit: values => {
            dispatch(aboutMe(values))
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

    const _checkLength = (value, length) => {
        return value.slice(0, length)
    }
    const handleTextChange = (e) => {
        const {name, value} = e.target
        formik.setFieldValue(name, value)
        setTextLength(e.target.value.length)
    }

    return <>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="text" onClick={handleClickOpen}>{profile.aboutMe.length === 0 ? 'Add biography':'change about me'}</Button>
            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
                <DialogTitle>About Me</DialogTitle>
                <DialogContent>
                        <form onSubmit={formik.handleSubmit}>
                <textarea  id="text" onChange={handleTextChange} name='aboutMe' value={_checkLength(formik.values.aboutMe, 99)}
                           label="write" variant="outlined" aria-label="empty textarea"
                           placeholder="write..." style={{ width: '100%',height:'80px',resize: 'none',outline:'none',border:'none',overflowY:'auto' ,fontSize:'18px'}}/>
                            <span style={{padding:'1rem',color:'#707070'}}> Characters left: {100 - textLength}</span>
                            <Button fullWidth type='submit' variant="outlined">change</Button>
                        </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    </>
})

export default AboutMe