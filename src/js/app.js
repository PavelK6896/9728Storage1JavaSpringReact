import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {Storage1} from "./page/storage1";
import {Login} from "./page/login";
import {ApiState} from "./store/api";

function App() {
    return (
        <ApiState>
            <BrowserRouter>
                <Switch history={history}>
                    <Route path={'/login'} component={Login}/>
                    <Route path={''} component={Storage1}/>
                </Switch>
            </BrowserRouter>
        </ApiState>
    );
}

export default App;
