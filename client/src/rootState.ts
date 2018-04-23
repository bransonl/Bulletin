import {createStore, Store} from "redux";
import {RouterState} from "react-router-redux";
import {FormState} from "redux-form";

import rootReducer from "./rootReducer";
import middleware from "./middleware";
import localStorage from "./helpers/localStorage";
import {ErrorState} from "./error/state/error.reducer";
import {UserState} from "./shared/state/user.reducer";
import {LoadingState} from "./shared/state/loading.reducer";
import {ConfigState} from "./shared/state/config.reducer";
import {ActiveBoardState} from "./boards/state/activeBoard.reducer";
import {BoardsState} from "./boards/state/boards.reducer";

interface RootState {
  router: RouterState;
  form: FormState;
  error: ErrorState;
  user: UserState;
  config: ConfigState;
  isLoading: LoadingState;
  activeBoard: ActiveBoardState;
  boards: BoardsState;
}

const persistedState: RootState = {
  router: undefined,
  form: undefined,
  error: undefined,
  user: localStorage.getItem("user"),
  config: undefined,
  isLoading: undefined,
  activeBoard: undefined,
  boards: [],
};

const store: Store<RootState> = createStore<RootState>(
  rootReducer, persistedState, middleware,
);

export {RootState};
export default store;
