import React from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {Button, Grid, TextField} from "@mui/material";

const StatusForm = React.memo(({updateMyStatus}) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {status: ''},
        onSubmit: values => {
            dispatch(updateMyStatus(values))
            formik.values.status = ''
        }
    })

    return <form onSubmit={formik.handleSubmit}>
        <Grid container sx={{display: 'flex', justifyContent: 'center',mt:'1rem'}}>
            <Grid item xs={12} xl={11} lg={11} md={11} sm={12}>
                <TextField fullWidth id="status" onChange={formik.handleChange} value={formik.values.status}
                           label="my status" variant="outlined"/>
            </Grid>
            <Grid item xs={12} xl={1} lg={1} md={1} sm={12}>
                <Button fullWidth sx={{height: '56px'}} variant="outlined" type="submit">send</Button>
            </Grid>
        </Grid>
    </form>

})

export default StatusForm