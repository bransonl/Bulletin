import {applyMiddleware} from "redux";
import {routerMiddleware} from "react-router-redux";
import {createEpicMiddleware} from "redux-observable";

import history from "../router/history";
import rootEpic from "./epic";

const router = routerMiddleware(history);
const epic = createEpicMiddleware(rootEpic);

const middleware = applyMiddleware(
  router,
  epic,
);

export default middleware;
