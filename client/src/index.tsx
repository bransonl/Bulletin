import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";

import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";
import "./stylesheets/styles.scss";

import rootEpic from "./epics";
import rootReducer from "./reducers";
import Router from "./routes";

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

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
