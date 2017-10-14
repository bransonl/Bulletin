import {applyMiddleware} from "redux";
import {createEpicMiddleware} from "redux-observable";

import authGuardMiddleware from "./auth.middleware";
import rootEpic from "../epics";

const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = applyMiddleware(authGuardMiddleware, epicMiddleware);

export default middleware;
