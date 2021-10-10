import {memo} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Users from "./Components/Users/Users";
import RootProfile from "./Components/Profile/RootProfile";
import Navbar from "./Components/Headers/Navbar";
import {Grid, Hidden} from "@mui/material";

function App() {
    return (<>

        <Navbar/>
        <Grid container>
            <Hidden only={['xs', 'sm', 'md']}>
                <Grid item xs={2} sx={{}}>
                    this is Menu
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={12} lg={8}>
                <Router>
                    <Switch>
                        <Route exact path='/' render={() => <RootProfile/>}/>
                        <Route path='/profile/:userId?' render={() => <RootProfile/>}/>
                        <Route path='/users' render={() => <Users/>}/>
                        <Route path='/signIn' render={() => <SignIn/>}/>
                        <Route path='/signUp' render={() => <SignUp/>}/>
                    </Switch>
                </Router>
            </Grid>
        </Grid>

    </>)
}

export default memo(App)
