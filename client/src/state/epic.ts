import {combineEpics, Epic} from "redux-observable";
import {Action} from "redux";

import errorEpics from "./error/error.epic";
import userEpics from "./user/user.epic";
import configEpics from "./config/config.epic";
import boardEpics from "./board/board.epic";

const rootEpic = combineEpics(
  errorEpics as Epic<Action, {}, any>,
  userEpics,
  configEpics,
  boardEpics,
);

export default rootEpic;
