import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './State-management/store'
import {Provider} from 'react-redux'
import './index.css'
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";

const theme = createTheme({
    palette:{
       green:{
           main:'#A7E05B'
       }
    }
})

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
        <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)
