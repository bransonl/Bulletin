import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {applyMiddleware, createStore, Middleware} from "redux";
import {createEpicMiddleware} from "redux-observable";
import "rxjs";

import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";
import "./stylesheets/styles.scss";

import "bootstrap/js/src/util";
import "bootstrap/js/src/alert";

import Router from "./routes";
import rootEpic from "./state/epics";
import rootReducer from "./state/reducers";
import authGuardMiddleware from "./state/middlewares/auth.middleware";

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(
  rootReducer,
  applyMiddleware(
    authGuardMiddleware,
    epicMiddleware,
  ),
);

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

if (module.hot) {
  module.hot.accept("./routes", () => {
    const NextRouter = require("./routes").default;
    ReactDOM.render(NextRouter, rootElement);
  });
}

render();
