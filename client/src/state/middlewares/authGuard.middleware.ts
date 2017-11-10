import {AnyAction, Middleware} from "redux";
import {push} from "react-router-redux";

import {ErrorActionType} from "../actions/error.action";
import {clearUser} from "../actions/user.action";

const authGuardMiddleware: Middleware = (store) => (next) => (action: AnyAction): any => {
  if (action.type === ErrorActionType.REQUEST_REJECTED && action.payload.code === 401) {
    store.dispatch(push("/login"));
    return next(clearUser());
  }
  return next(action);
};

export default authGuardMiddleware;
