import * as React from "react";
import * as ReactDOM from "react-dom";
import {hot} from "react-hot-loader";
import {Provider} from "react-redux";
import "rxjs";

// Bootstrap imports
// TODO: only import used plugins
import "bootstrap";

import "bootstrap/scss/bootstrap.scss"; // Bootstrap styles
import "./stylesheets/styles.scss"; // Global styles

import Router from "./router/components/router.component";
import store from "./rootState";

const rootElement = document.getElementById("root");

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

const HotApp = hot(module)(App);

ReactDOM.render(<HotApp />, rootElement);
