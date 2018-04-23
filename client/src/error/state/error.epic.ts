import {ActionsObservable, combineEpics} from "redux-observable";
import {push} from "react-router-redux";
import {Observable} from "rxjs/Rx";

import store from "../../rootState";
import {ErrorAction, ErrorActionType} from "./error.action";
import {clearUser, UserAction} from "../../shared/state/user.action";

const requestRejectedEpic = (
  action$: ActionsObservable<ErrorAction>,
): Observable<UserAction> => (
  action$
  .ofType(
    ErrorActionType.RequestRejected,
    ErrorActionType.Unauthenticated,
  )
  .do(() => store.dispatch(push("/login")))
  .mapTo(clearUser())
);

export default combineEpics(
  requestRejectedEpic,
);
