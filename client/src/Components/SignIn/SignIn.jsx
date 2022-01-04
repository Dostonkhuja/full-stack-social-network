import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, Box, Container, Link, Typography} from '@mui/material'
import SignInForm from "./SignInForm";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const SignIn = () => {

    const errorMessage = useSelector(state => state.signIn.errorMessage)
    const isAuth = useSelector(state => state.signIn.isAuth)

    if (isAuth){
        return <Redirect to='/' />
    }

    return <Container component="main" maxWidth="xs">
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar sx={{m: 1, bgcolor:'#a7e05b'}}> <LockOutlinedIcon/> </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <SignInForm errorMessage={errorMessage}/>
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
}

export default React.memo(SignIn)