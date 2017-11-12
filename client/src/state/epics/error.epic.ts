import {ActionsObservable, combineEpics} from "redux-observable";
import {push} from "react-router-redux";

import store from "../index";
import {ErrorAction, ErrorActionType} from "../actions/error.action";
import {clearUser} from "../actions/user.action";

const requestRejectedEpic = (action$: ActionsObservable<ErrorAction>) => (
  action$
    .ofType(ErrorActionType.REQUEST_REJECTED)
    .do(() => store.dispatch(push("/login")))
    .mapTo(clearUser())
);

export default combineEpics(
  requestRejectedEpic,
);
