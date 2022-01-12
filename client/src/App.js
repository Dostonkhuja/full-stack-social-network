import {Route, useHistory} from "react-router-dom";
import Home from './Components/Home/Home'
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
import {getNotificationMsg} from './Redux-middleware/initMessengerSocketMiddleware'

import {guestNotificationSubscribe} from "./Redux-middleware/initGuestsMiddleware";
import Guests from "./Components/Guests/Guests";
import {getAuthMe} from "./State-management/ProfileSlice";
import Chat from "./Components/Chat/Chat";

function App() {
    const dispatch = useDispatch()
    const history = useHistory()

    const ownerId = useSelector(state => state.profile.ownerId)
    const token = localStorage.getItem('x-auth-token')

    useEffect(() => {
        if (ownerId === ''){
            token ? dispatch(getAuthMe()) : history.push('/signIn')
        }else{
            dispatch(initalisationSocket(ownerId))
            dispatch(getNotificationMsg(ownerId))
            dispatch(guestNotificationSubscribe(ownerId))
        }
    }, [ownerId,token])

    return (<>
        <div style={{position: 'sticky',top:'0',zIndex:'20',marginTop:'-1rem'}}>
            <Navbar />
        </div>
        <Grid container spacing={1}>
            <Hidden only={['xs', 'sm', 'md']}>
                {token && <Grid item xs={2} xl={2}>
                    <div style={{position: 'sticky',top:55,zIndex:'300'}}>
                    <NavigationMenu/>
                    </div>
                </Grid>}
            </Hidden>
            <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Route exact path='/' render={() => <Home/>}/>
                <Route path='/profile/:userId?' render={() => <RootProfile/>}/>
                <Route path='/users' render={() => <Users/>}/>
                <Route path='/guests' render={() => <Guests/>}/>
                <Route path='/chat' render={() => <Chat/>}/>
                <Route path='/signIn' render={() => <SignIn/>}/>
                <Route path='/signUp' render={() => <SignUp/>}/>
                <Route path='/messenger' render={() => <Messenger/>}/>
            </Grid>
        </Grid>
    </>)
}

export default App
