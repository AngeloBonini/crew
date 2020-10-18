import React, { Suspense } from "react";
import {DataProvider} from "./api.context";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";

const MainRoute = React.lazy(() => import("./Main"));


function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
        <DataProvider>
            <Switch>
                <Route exact path={'/'} component={MainRoute}/>
            </Switch>
        </DataProvider>
    </Suspense>
</BrowserRouter>
  );
}

export default App;