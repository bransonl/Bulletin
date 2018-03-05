import {createStore, Store} from "redux";
import {RouterState} from "react-router-redux";
import {FormState} from "redux-form";

import rootReducer from "./reducer";
import middleware from "./middleware";
import localStorage from "./localStorage";
import {ErrorState} from "./error/error.reducer";
import {UserState} from "./user/user.reducer";
import {LoadingState} from "./loading/loading.reducer";
import {ConfigState} from "./config/config.reducer";

interface RootState {
  router: RouterState;
  form: FormState;
  error: ErrorState;
  user: UserState;
  config: ConfigState;
  isLoading: LoadingState;
}

const persistedState: RootState = {
  router: undefined,
  form: undefined,
  error: undefined,
  user: localStorage.getItem("user"),
  config: undefined,
  isLoading: undefined,
};

const store: Store<RootState> = createStore<RootState>(
  rootReducer, persistedState, middleware,
);

export {RootState};
export default store;
