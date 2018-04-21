import {combineReducers, Reducer} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from "react-router-redux";

import {RootState} from "./index";
import error from "./error/error.reducer";
import isLoading from "./loading/loading.reducer";
import user from "./user/user.reducer";
import config from "./config/config.reducer";
import board from "./board/board.reducer";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  router: routerReducer,
  form: formReducer,
  error,
  isLoading,
  user,
  config,
  board,
});

export default rootReducer;
