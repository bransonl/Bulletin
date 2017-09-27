import {combineEpics} from "redux-observable";

import loginEpic from "./user.epic";

const rootEpic = combineEpics(
  loginEpic,
);

export default rootEpic;
