import * as React from 'react';
import {useState} from "react";
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {sendSIgnIn} from "../State-management/loginSlice";
import {Container, Typography, Box, Grid, Link, Checkbox, FormControlLabel, TextField, Button, Avatar} from '@mui/material'

const SignIn = () => {

    const [mouseErrorEmail, setMouseErrorEmail] = useState(false)
    const [mouseErrorPassword, setMouseErrorPassword] = useState(false)

    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.signIn.errorMessage)

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        onSubmit: values => dispatch(sendSIgnIn({values}))
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

    return (<>
            <Container component="main" maxWidth="xs">
                <Box sx={{marginTop: 8, display: 'flex',flexDirection: 'column',alignItems: 'center'}}>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}> <LockOutlinedIcon/> </Avatar>

                    <Typography component="h1" variant="h5">Sign in</Typography>

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
                            sx={{display: 'flex',alignItems: 'center',justifyContent:'center'}}
                        />

                        <Typography component="h4" variant="h6"  sx={{color:'red', textAlign:"center", marginTop:'10px'}}>
                            {errorMessage !== null && errorMessage}
                        </Typography>

                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>Sign In</Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        Doston Sheraliyev social-network app
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </>
    )
}

export default SignIn