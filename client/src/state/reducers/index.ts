import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from "react-router-redux";

import {RootState} from "../index";
import error from "./error.reducer";
import user from "./user.reducer";
import isLoading from "./loading.reducer";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  router: routerReducer,
  form: formReducer,
  error,
  user,
  isLoading,
});

export default rootReducer;
