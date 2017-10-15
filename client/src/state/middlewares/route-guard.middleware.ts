import {AnyAction, Middleware} from "redux";
import {LOCATION_CHANGE, push} from "react-router-redux";

import {routes} from "../../routes";

// TODO: properly type this and
const routeGuardMiddleware: Middleware = (store) => (next) => (action: AnyAction): any => {
    if (action.type === LOCATION_CHANGE) {
      const pathname = action.payload.pathname;
      const state: any = store.getState(); // TODO: type this
      if (routes[pathname] && routes[pathname].requiresAuth && state.user === null) {
        console.log("unauthorized"); // TODO: remove this
        store.dispatch(push("/"));
      }
    }
    return next(action);
  };

export default routeGuardMiddleware;
