import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Avatar, Box, Grid, Link, Typography} from '@mui/material'
import SignInForm from "./SignInForm";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const SignIn = () => {

    const errorMessage = useSelector(state => state.signIn.errorMessage)
    const isAuth = useSelector(state => state.signIn.isAuth)

    if (isAuth){
        return <Redirect to='/' />
    }

    return <Grid item xs={12} component="main" maxWidth="xs">
                <Box  sx={{pl:25,marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar sx={{m: 1, bgcolor:'#1976d2'}}> <LockOutlinedIcon/> </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <SignInForm errorMessage={errorMessage}/>
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4,pl:25}}>
                    {'Copyright © '}
                    <Link color="inherit" href="/">
                        Doston Sheraliyev social-network app
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Grid>
}

export default React.memo(SignIn)