import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from "react-router-redux";

import error from "./error.reducer";
import user from "./user.reducer";
import {RootState} from "../index";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  router: routerReducer,
  form: formReducer,
  error,
  user,
});

export default rootReducer;
