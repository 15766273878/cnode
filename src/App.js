import React from 'react';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "mobx-react"

import {MuiThemeProvider,createMuiTheme} from "material-ui/styles"
import {lightGreen,pink} from "material-ui/colors"


import AppState from "./store/app.state"
import TopicStore from "./store/topic.store"
import Routers from "./config/router"

import MainAppBar from "./views/layout/app-bar"


const theme = createMuiTheme({
    palette:{
        primary:lightGreen,
        secondary:pink,
        type:"light"
    }
})

const appState = new AppState();
const topicStore = new TopicStore()
function App() {
    return (
        <Provider appState={appState} topicStore={topicStore}>
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div>
                        <MainAppBar></MainAppBar>
                        <Routers></Routers>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        </Provider>
    );
}


export default App;