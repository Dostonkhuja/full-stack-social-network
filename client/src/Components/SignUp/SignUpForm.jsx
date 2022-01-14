import * as React from 'react';
import {useState} from 'react';
import {useFormik} from 'formik';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendSignUp} from "../../State-management/SignUpSlice";
import {Box, Button, Grid, TextField, Typography} from '@mui/material'

const SignUpForm = React.memo(({errorMessage}) => {
    const dispatch = useDispatch()

    const [mouseErrorEmail, setMouseErrorEmail] = useState(false)
    const [mouseErrorPassword, setMouseErrorPassword] = useState(false)
    const [mouseErrorlastName, setMouseErrorlastName] = useState(false)
    const [mouseErrorfirstName, setMouseErrorfirstName] = useState(false)

    const formik = useFormik({
        initialValues: {firstName: '',lastName: '', email: '', password: ''},
        onSubmit: values => {
            dispatch(sendSignUp(values))
            formik.values = ''
        }
    })

    const handleOnBlurEmail = () => {
        formik.values.email === "" ? setMouseErrorEmail(true) : setMouseErrorEmail(false)
    }
    const handleOnFocusEmail = () => {
        formik.values.email === "" ? setMouseErrorEmail(true) : setMouseErrorEmail(false)
    }
    const handleOnBlurPassword = () => {
        formik.values.password === "" ? setMouseErrorPassword(true) : setMouseErrorPassword(false)
    }
    const handleOnFocusPassword = () => {
        formik.values.password === "" ? setMouseErrorPassword(false) : setMouseErrorPassword(true)
    }
    const handleOnBlurLastName = () => {
        formik.values.lastName === "" ? setMouseErrorlastName(true) : setMouseErrorlastName(false)
    }
    const handleOnFocusLastName = () => {
        formik.values.lastName === "" ? setMouseErrorlastName(false) : setMouseErrorlastName(true)
    }
    const handleOnBlurFirstName = () => {
        formik.values.firstName === "" ? setMouseErrorfirstName(true) : setMouseErrorfirstName(false)
    }
    const handleOnFocusFirstName = () => {
        formik.values.firstName === "" ? setMouseErrorfirstName(false) : setMouseErrorfirstName(true)
    }

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        onBlur={handleOnBlurFirstName}
                        onFocus={handleOnFocusFirstName}
                        error={mouseErrorfirstName}
                        helperText={mouseErrorfirstName && "enter the your first name"}
                        required
                        fullWidth
                        id="firstName"
                        label="first name"
                        name="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onBlur={handleOnBlurLastName}
                        onFocus={handleOnFocusLastName}
                        error={mouseErrorlastName}
                        helperText={mouseErrorlastName && "enter the your last name"}
                        required
                        fullWidth
                        id="lastName"
                        label="last name"
                        name="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onBlur={handleOnBlurEmail}
                        onFocus={handleOnFocusEmail}
                        error={mouseErrorEmail}
                        helperText={mouseErrorEmail && "enter the email adress"}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onBlur={handleOnBlurPassword}
                        onFocus={handleOnFocusPassword}
                        error={mouseErrorPassword}
                        helperText={mouseErrorPassword && "enter the password"}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </Grid>
            </Grid>
            <Typography component="h4" variant="h6"
                        sx={{color: 'red', textAlign: "center", marginTop: '10px'}}>
                {errorMessage !== null && errorMessage}
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <NavLink to={'/signIn'} variant="body2">
                        <span style={{color: '#1976d2'}}>{"Already have an account? Sign in"}</span>
                    </NavLink>
                </Grid>
            </Grid>
        </Box>
    )
})

export default SignUpForm