import {AnyAction, Middleware} from "redux";
import {ErrorActionType} from "../actions/error.action";
import {clearUser} from "../actions/user.action";

const authGuardMiddleware: Middleware = (store) => (next) => (action: AnyAction): any => {
  if (action.type === ErrorActionType.REQUEST_REJECTED && action.payload.code === 401) {
    return next(clearUser());
  }
  return next(action);
};

export default authGuardMiddleware;
