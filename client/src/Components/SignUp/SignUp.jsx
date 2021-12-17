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
        debugger
        return <Redirect to='/profile'/>
    }

    return <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar  sx={{m: 1, backgroundColor: '#a7e05b'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                  <SignUpForm errorMessage={errorMessage}/>

                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
                    {'Copyright © '}
                    <Link color="inherit" href="/signIn">
                        Doston Sheraliyev social-network app
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
})

export default SignUp