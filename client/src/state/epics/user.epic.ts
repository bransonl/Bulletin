import {push} from "react-router-redux";
import {ActionsObservable, combineEpics} from "redux-observable";
import {ajax} from "rxjs/observable/dom/ajax";
import {Observable} from "rxjs/Rx";

import env from "../../env/env";
import store from "../index";
import localStorage from "../localStorage";
import {identifyUser, UserAction, UserActionType} from "../actions/user.action";
import {formRequestRejected, requestRejected} from "../actions/error.action";
import nullAction from "../actions/null.action";

const clearUserEpic = (action$: ActionsObservable<UserAction>) => (
  action$
    .ofType(UserActionType.CLEAR_USER)
    .do((action: UserAction) => localStorage.setItem("user", null))
    .do(() => store.dispatch(push("/login")))
    .mapTo(nullAction())
);

const identifyUserEpic = (action$: ActionsObservable<UserAction>) => (
  action$
    .ofType(UserActionType.IDENTIFY_USER)
    .do((action: UserAction) => localStorage.setItem("user", action.payload))
    .do(() => store.dispatch(push("/")))
    .mapTo(nullAction())
);

const loginEpic = (action$: ActionsObservable<UserAction>) => (
  action$
    .ofType(UserActionType.LOGIN_REQUEST)
    .mergeMap((action: UserAction) => {
      const url = `${env.endpoint}/login`;
      return ajax({
        url,
        body: action.payload,
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .map((res) => identifyUser(res.xhr.response.data))
        .catch((err) =>
          Observable.of(requestRejected(err.xhr.response)));
    })
);

const signupEpic = (action$: ActionsObservable<UserAction>) => (
  action$
    .ofType(UserActionType.SIGNUP_REQUEST)
    .mergeMap((action: UserAction) => {
      const url = `${env.endpoint}/signup`;
      return ajax({
        url,
        body: action.payload,
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
        .map((res) => identifyUser(res.xhr.response.data))
        .catch((err) =>
          Observable.of(formRequestRejected(err.xhr.response)));
    })
);

export default combineEpics(
  clearUserEpic,
  identifyUserEpic,
  loginEpic,
  signupEpic,
);
