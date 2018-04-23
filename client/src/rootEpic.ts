import {combineEpics, Epic} from "redux-observable";
import {Action} from "redux";

import errorEpics from "./error/state/error.epic";
import userEpics from "./shared/state/user.epic";
import configEpics from "./shared/state/config.epic";
import boardEpics from "./boards/state/board.epic";

const rootEpic = combineEpics(
  errorEpics as Epic<Action, {}, any>,
  userEpics,
  configEpics,
  boardEpics,
);

export default rootEpic;
