import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {applyMiddleware, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";

import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";
import "./stylesheets/styles.scss";

import rootEpic from "./epics";
import rootReducer from "./reducers";

import HomeComponent from "./components/home/home.component";
import LandingComponent from "./components/landing/landing.component";

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={HomeComponent} />
        <Route path="/register" component={LandingComponent} />
        <Route path="/" component={LandingComponent} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
