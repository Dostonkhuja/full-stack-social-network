import * as React from 'react';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {CssBaseline, Container, Typography, Box, Grid, Link, TextField, Button, Avatar} from '@mui/material'
import {Redirect} from "react-router-dom";
import {sendSIgnIn} from "../../State-management/SignInSlice";
import SignUpForm from "./SignUpForm";

const SignUp = React.memo(() => {
    console.log('signUp rendered')

    const dispatch = useDispatch()
    const errorMessage = useSelector(state => state.signUp.errorMessage)
    const user = useSelector(state => state.signUp.user)
    const signInData = useSelector(state => state.signUp.signInData)
    const isAuth = useSelector(state => state.signIn.isAuth)

    useEffect(() => {
        if (!isAuth && user && signInData) {
            dispatch(sendSIgnIn(signInData))
        }
    }, [user])

    if (isAuth){
        return <Redirect to='/profile'/>
    }

    return <Grid item xs={12} component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{pl:25,marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar  sx={{m: 1, backgroundColor: '#1976d2'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign up</Typography>
                  <SignUpForm errorMessage={errorMessage}/>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4,pl:20}}>
                    {'Copyright © '}
                    <Link color="inherit" href="/signIn">
                        Doston Sheraliyev social-network app
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Grid>
})

export default SignUp