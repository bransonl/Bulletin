import {push} from "react-router-redux";
import {ActionsObservable} from "redux-observable";
import {ajax} from "rxjs/observable/dom/ajax";
import {Observable} from "rxjs/Rx";

import env from "../../env/env";
import store from "../index";
import localStorage from "../localStorage";
import {
  identifyUser, UserAction, UserActionType,
} from "../actions/user.action";
import {formRequestRejected, requestRejected} from "../actions/error.action";
import nullAction from "../actions/null.action";

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
        .do((res) => localStorage.setItem("user", res.xhr.response.data))
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
        .do((res) => localStorage.setItem("user", res.xhr.response.data))
        .map((res) => identifyUser(res.xhr.response.data))
        .catch((err) =>
          Observable.of(formRequestRejected(err.xhr.response)));
    })
);

const identifyEpic = (action$: ActionsObservable<UserAction>) => (
  action$
    .ofType(UserActionType.IDENTIFY_USER)
    .do(() => store.dispatch(push("/home")))
    .mapTo(nullAction())
);

export {loginEpic, signupEpic, identifyEpic};
