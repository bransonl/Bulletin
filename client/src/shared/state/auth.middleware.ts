import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from "redux";

import {RootState} from "../../rootState";
import {unauthenticated} from "../../error/state/error.action";

const authCheckMiddleware = (store: MiddlewareAPI<RootState>) => (
  (next: Dispatch<RootState>) => (
    (action: AnyAction) => {
      if (action.requiresAuth) {
        const state = store.getState();
        if (state.user === null || !state.user.token) {
          return next(unauthenticated());
        }
        return next(action);
      }
      return next(action);
    }
  )
);

export default authCheckMiddleware;
