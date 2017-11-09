import {applyMiddleware} from "redux";
import {routerMiddleware} from "react-router-redux";
import {createEpicMiddleware} from "redux-observable";

import {history} from "../../routes";
import authGuard from "./authGuard.middleware";
import routeGuard from "./routeGuard.middleware";
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
