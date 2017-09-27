import {ActionsObservable} from "redux-observable";
import {ajax} from "rxjs/observable/dom/ajax";
import {Observable} from "rxjs/Rx";

import env from "../../env/env";
import {
  loginFulfilled, UserAction, UserActionType,
} from "../actions/user.action";
import {requestRejected} from "../actions/error.action";

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
        .map((res) => loginFulfilled(res.xhr.response.data))
        .catch((err) =>
          Observable.of(requestRejected(err.xhr.response)));
    })
);

export default loginEpic;
