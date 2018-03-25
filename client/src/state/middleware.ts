import {applyMiddleware, Middleware} from "redux";
import {routerMiddleware} from "react-router-redux";
import {createEpicMiddleware} from "redux-observable";

import history from "../router/history";
import rootEpic from "./epic";
import authCheckMiddleware from "./auth/auth.middleware";

const router = routerMiddleware(history);
const epic = createEpicMiddleware(rootEpic);

const middleware = applyMiddleware(
  router,
  epic,
  authCheckMiddleware as Middleware,
);

export default middleware;
