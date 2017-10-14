import {combineReducers} from "redux";
import {reducer as formReducer, FormReducer} from "redux-form";
import {routerReducer, RouterState} from "react-router-redux";

import error, {ErrorState} from "./error.reducer";
import user, {UserState} from "./user.reducer";

interface RootState {
  router: RouterState,
  form: FormReducer,
  error: ErrorState,
  user: UserState,
}

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  error,
  user,
});

export default rootReducer;
