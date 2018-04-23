import {MiddlewareAPI} from "redux";
import {ActionsObservable, combineEpics} from "redux-observable";
import {ajax} from "rxjs/observable/dom/ajax";
import {Observable} from "rxjs/Rx";

import env from "../../env/env";
import {RootState} from "../../rootState";
import {createHeaders} from "../../helpers/headers";
import {BoardAction, BoardActionType, setActiveBoard} from "./board.action";
import {
  hideLoading, showLoading, LoadingAction,
} from "../../shared/state/loading.action";
import {
  formRequestRejected, ErrorAction,
} from "../../error/state/error.action";

const createBoardEpic = (
  action$: ActionsObservable<BoardAction>,
  store: MiddlewareAPI<RootState>,
): Observable<BoardAction | ErrorAction | LoadingAction> => (
  action$
  .ofType(BoardActionType.CreateBoard)
  .mergeMap((action) => {
    const url = `${env.endpoint}/boards`;
    const user = store.getState().user;
    return Observable.of(
      Observable.of(showLoading()),
      ajax({
        url,
        body: action.payload,
        method: "POST",
        headers: createHeaders(user),
      })
      .mergeMap((res) => (
        Observable.from([
          setActiveBoard(res.xhr.response.data),
          hideLoading(),
        ])
      ))
      .catch((err) => (
        Observable.from([
          formRequestRejected(err.xhr.response),
          hideLoading(),
        ])
      )),
    )
    .mergeAll();
  })
);

export default combineEpics(
  createBoardEpic,
);
