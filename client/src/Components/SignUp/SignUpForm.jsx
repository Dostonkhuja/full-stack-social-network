import * as React from 'react';
import {useState} from 'react';
import {useFormik} from 'formik';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {sendSignUp} from "../../State-management/SignUpSlice";
import {Box, Button, Grid, TextField, Typography} from '@mui/material'

const SignUpForm = React.memo(({errorMessage}) => {
    const dispatch = useDispatch()

    console.log('signUpForm rendered')

    const [mouseErrorEmail, setMouseErrorEmail] = useState(false)
    const [mouseErrorPassword, setMouseErrorPassword] = useState(false)
    const [mouseErrorNickName, setMouseErrorNickName] = useState(false)

    const formik = useFormik({
        initialValues: {name: '', email: '', password: ''},
        onSubmit: values => dispatch(sendSignUp(values))
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
        formik.values.password === "" ? setMouseErrorPassword(true) : setMouseErrorPassword(false)
    }
    const handleOnBlurNickName = () => {
        formik.values.name === "" ? setMouseErrorNickName(true) : setMouseErrorNickName(false)
    }
    const handleOnFocusNickName = () => {
        formik.values.name === "" ? setMouseErrorNickName(true) : setMouseErrorNickName(false)
    }

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        onBlur={handleOnBlurNickName}
                        onFocus={handleOnFocusNickName}
                        error={mouseErrorNickName}
                        helperText={mouseErrorNickName && "enter the your nick name"}
                        required
                        fullWidth
                        id="name"
                        label="Nick name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
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