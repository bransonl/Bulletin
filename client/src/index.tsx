import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import "rxjs";

// Bootstrap imports
// TODO: only import used plugins
import "bootstrap";

import "bootstrap/scss/bootstrap.scss"; // Bootstrap styles
import "./stylesheets/styles.scss"; // Global styles

import Router from "./router";
import store from "./state";

const rootElement = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router />
      </Provider>
    </AppContainer>,
    rootElement,
  );
};

render();

if (module.hot) {
  module.hot.accept("./router", () => {
    const NextRouter = require("./router").default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextRouter />
        </Provider>
      </AppContainer>,
      rootElement);
  });
}
