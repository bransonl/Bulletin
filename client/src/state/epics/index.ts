import {combineEpics, Epic} from "redux-observable";
import {Action} from "redux";

import errorEpics from "./error.epic";
import userEpics from "./user.epic";
import configEpics from "./config.epic";

const rootEpic = combineEpics(
  errorEpics as Epic<Action, {}, any>,
  userEpics,
  configEpics,
);

export default rootEpic;
