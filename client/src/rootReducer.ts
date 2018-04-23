import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from "react-router-redux";

import {RootState} from "./rootState";
import error from "./error/state/error.reducer";
import isLoading from "./shared/state/loading.reducer";
import user from "./shared/state/user.reducer";
import config from "./shared/state/config.reducer";
import activeBoard from "./boards/state/activeBoard.reducer";
import boards from "./boards/state/boards.reducer";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  router: routerReducer,
  form: formReducer,
  error,
  isLoading,
  user,
  config,
  activeBoard,
  boards,
});

export default rootReducer;
