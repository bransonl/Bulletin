import {applyMiddleware} from "redux";
import {routerMiddleware} from "react-router-redux";
import {createEpicMiddleware} from "redux-observable";

import {history} from "../../routes";
import authGuard from "./auth-guard.middleware";
import routeGuard from "./route-guard.middleware";
import rootEpic from "../epics";

const router = routerMiddleware(history);
const epic = createEpicMiddleware(rootEpic);

const middleware = applyMiddleware(
  authGuard,
  routeGuard,
  router,
  epic,
);

export default middleware;
