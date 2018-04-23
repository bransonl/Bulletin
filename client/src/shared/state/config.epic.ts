import {ActionsObservable, combineEpics} from "redux-observable";
import {ajax} from "rxjs/observable/dom/ajax";
import {Observable} from "rxjs/Rx";

import env from "../../env/env";
import store from "../../rootState";
import {
  ConfigAction, ConfigActionType,
  saveConfigs, saveSingleConfig,
} from "./config.action";
import {
  ErrorAction, requestRejected,
} from "../../error/state/error.action";
import {nullAction} from "./null.action";
import {
  hideLoading, LoadingAction, showLoading,
} from "./loading.action";

const fetchConfigsEpic = (
  action$: ActionsObservable<ConfigAction>,
): Observable<ConfigAction | ErrorAction | LoadingAction> => (
  action$
  .ofType(ConfigActionType.FetchConfigs)
  .mergeMap((action) => {
    const url = `${env.endpoint}/configs`;
    return Observable.of(
      Observable.of(showLoading()),
      ajax({
        url,
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
      .mergeMap((res) =>
      Observable.from([
        saveConfigs(res.xhr.response.data),
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

const fetchSingleConfig = (
  action$: ActionsObservable<ConfigAction>,
): Observable<ConfigAction | ErrorAction | LoadingAction> => (
  action$
  .ofType(ConfigActionType.FetchSingleConfig)
  .mergeMap((action) => {
    const configName: string = action.payload as string;
    const url = `${env.endpoint}/configs/${configName}`;
    return Observable.of(
      Observable.of(showLoading()),
      ajax({
        url,
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      })
      .mergeMap((res) =>
      Observable.from([
        saveSingleConfig(configName, res.xhr.response.data.config[configName]),
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

export default combineEpics(
  fetchConfigsEpic,
  fetchSingleConfig,
);
