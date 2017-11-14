import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import "rxjs";

import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";
import "./stylesheets/styles.scss";

import "bootstrap/js/src/util";
import "bootstrap/js/src/alert";
import "bootstrap/js/src/collapse";

import Router from "./components/router/router.component";
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
  module.hot.accept("./components/router/router.component", () => {
    const NextRouter = require("./components/router/router.component").default;
    ReactDOM.render(NextRouter, rootElement);
  });

}
