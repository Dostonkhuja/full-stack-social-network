import {Redirect, Route} from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Users from "./Components/Users/Users";
import RootProfile from "./Components/Profile/RootProfile";
import Navbar from "./Components/Headers/Navbar";
import {Grid, Hidden} from "@mui/material";
import NavigationMenu from "./Components/Nav-Menu/NavigationMenu";
import Messenger from "./Components/Messenger/Messenger";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initalisationSocket} from "./Redux-middleware/initOnlineSocketMiddleware";

function App() {

    const dispatch = useDispatch()

    const ownerId = useSelector(state => state.profile.ownerId)

    useEffect(() => {
        if (ownerId !== ''){
            dispatch(initalisationSocket(ownerId))
        }
    }, [ownerId])

    return (<>
        <Redirect to={'/profile'}/>
        <div style={{position: 'sticky',top:'0',zIndex:'999999'}}>
            <Navbar/>
        </div>
        <Grid container spacing={1}>
            <Hidden only={['xs', 'sm', 'md']}>
                <Grid item xs={2} sx={{}}>
                    <NavigationMenu/>
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={12}>
                <Route exact path='/' render={() => <h1>HOME PAGE</h1>}/>
                <Route path='/profile/:userId?' render={() => <RootProfile/>}/>
                <Route path='/users' render={() => <Users/>}/>
                <Route path='/signIn' render={() => <SignIn/>}/>
                <Route path='/signUp' render={() => <SignUp/>}/>
                <Route path='/messenger' render={() => <Messenger/>}/>
            </Grid>
        </Grid>
    </>)
}

export default App
