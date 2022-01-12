import * as React from 'react';
import {useState} from "react";
import {useFormik} from 'formik';
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {sendSIgnIn} from "../../State-management/SignInSlice";
import {Typography, Box, Grid, Link, Checkbox, FormControlLabel, TextField, Button, Avatar} from '@mui/material'

const SignInForm = ({errorMessage}) => {
    const dispatch = useDispatch()

    const [mouseErrorEmail, setMouseErrorEmail] = useState(false)
    const [mouseErrorPassword, setMouseErrorPassword] = useState(false)

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        onSubmit: values => {
            dispatch(sendSIgnIn({values}))
            formik.values = ''
        }
    })

    const handleOnBlurEmail = ({errorMessage}) => {
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

    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
                onBlur={handleOnBlurEmail}
                onFocus={handleOnFocusEmail}
                error={mouseErrorEmail}
                helperText={mouseErrorEmail && "enter the email adress"}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <TextField
                onBlur={handleOnBlurPassword}
                onFocus={handleOnFocusPassword}
                error={mouseErrorPassword}
                helperText={mouseErrorPassword && "enter the password"}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
                name="rememberMe"
                onChange={formik.handleChange}
                value={formik.values.email}
                sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            />

            <Typography component="h4" variant="h6"
                        sx={{color: 'red', textAlign: "center", marginTop: '10px'}}>
                {errorMessage !== null && errorMessage}
            </Typography>

            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Sign In</Button>

            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                    <NavLink to={'/signUp'}>
                        <span style={{color: '#1976d2'}}>{"Don't have an account? Sign Up"}</span>
                    </NavLink>
                </Grid>
            </Grid>
        </Box>
    )
}

export default React.memo(SignInForm)