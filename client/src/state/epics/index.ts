import {combineEpics} from "redux-observable";

import {loginEpic, signupEpic, identifyEpic} from "./user.epic";

const rootEpic = combineEpics(
  loginEpic,
  signupEpic,
  identifyEpic,
);

export default rootEpic;
