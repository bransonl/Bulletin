import {createStore, Store} from "redux";
import {RouterState} from "react-router-redux";
import {FormState} from "redux-form";

import rootReducer from "./reducers";
import middleware from "./middlewares";
import {ErrorState} from "./reducers/error.reducer";
import {UserState} from "./reducers/user.reducer";

interface RootState {
  router: RouterState;
  form: FormState;
  error: ErrorState;
  user: UserState;
}

const store: Store<RootState> = createStore<RootState>(rootReducer, middleware);

export {RootState};
export default store;
