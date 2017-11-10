import {combineEpics} from "redux-observable";

import errorEpics from "./error.epic";
import userEpics from "./user.epic";

const rootEpic = combineEpics(
  errorEpics,
  userEpics,
);

export default rootEpic;
