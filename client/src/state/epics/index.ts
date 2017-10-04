import {combineEpics} from "redux-observable";

import {loginEpic, signupEpic} from "./user.epic";

const rootEpic = combineEpics(
  loginEpic,
  signupEpic,
);

export default rootEpic;
