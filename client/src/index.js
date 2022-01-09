import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {store} from './State-management/store'
import {BrowserRouter as Router, Switch} from "react-router-dom";

const theme = createTheme({
    palette: {
        green: {main: '#A7E05B'}
    }
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <App/>
                </Switch>
            </Router>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
