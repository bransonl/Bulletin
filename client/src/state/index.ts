import {createStore, Store} from "redux";
import {RouterState} from "react-router-redux";
import {FormState} from "redux-form";

import rootReducer from "./reducers";
import middleware from "./middlewares";
import {ErrorState} from "./reducers/error.reducer";
import {UserState} from "./reducers/user.reducer";
import localStorage from "./localStorage";
import {LoadingState} from "./reducers/loading.reducer";

interface RootState {
  router: RouterState;
  form: FormState;
  error: ErrorState;
  user: UserState;
  isLoading: LoadingState;
}

const persistedState: RootState = {
  router: undefined,
  form: undefined,
  error: undefined,
  user: localStorage.getItem("user"),
  isLoading: undefined,
};

const store: Store<RootState> = createStore<RootState>(
  rootReducer, persistedState, middleware,
);

export {RootState};
export default store;
