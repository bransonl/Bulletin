import {push} from "react-router-redux";
import {ActionsObservable, combineEpics} from "redux-observable";
import {ajax} from "rxjs/observable/dom/ajax";
import {Observable} from "rxjs/Rx";

import env from "../../env/env";
import store from "../index";
import localStorage from "../localStorage";
import {identifyUser, UserAction, UserActionType} from "../actions/user.action";
import {
  ErrorAction, formRequestRejected, requestRejected,
} from "../actions/error.action";
import {nullAction} from "../actions/null.action";
import {
  hideLoading, LoadingAction, showLoading,
} from "../actions/loading.action";

const clearUserEpic = (action$: ActionsObservable<UserAction>) => (
  action$
    .ofType(UserActionType.CLEAR_USER)
    .do(() => localStorage.setItem("user", null))
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

const loginEpic = (action$: ActionsObservable<UserAction>):
  Observable<UserAction | ErrorAction | LoadingAction> => (
    action$
      .ofType(UserActionType.LOGIN_REQUEST)
      .mergeMap((action: UserAction) => {
        const url = `${env.endpoint}/login`;
        return Observable.of(
          Observable.of(showLoading()),
          ajax({
            url,
            body: action.payload,
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .mergeMap((res) =>
              Observable.from([
                identifyUser(res.xhr.response.data),
                hideLoading(),
              ]))
            .catch((err) =>
              Observable.from([
                requestRejected(err.xhr.response),
                hideLoading(),
              ])),
        )
          .mergeAll();
      })
  );

const signupEpic = (action$: ActionsObservable<UserAction>):
  Observable<UserAction | ErrorAction | LoadingAction> => (
    action$
      .ofType(UserActionType.SIGNUP_REQUEST)
      .mergeMap((action: UserAction) => {
        const url = `${env.endpoint}/signup`;
        return Observable.of(
          Observable.of(showLoading()),
          ajax({
            url,
            body: action.payload,
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          })
            .mergeMap((res) =>
              Observable.from([
                identifyUser(res.xhr.response.data),
                hideLoading(),
              ]))
            .catch((err) =>
              Observable.from([
                formRequestRejected(err.xhr.response),
                hideLoading(),
              ])),
        )
          .mergeAll();
      })
  );

export default combineEpics(
  clearUserEpic,
  identifyUserEpic,
  loginEpic,
  signupEpic,
);
