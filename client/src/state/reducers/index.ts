import {combineReducers} from "redux";
import {reducer as formReducer, FormReducer} from "redux-form";

import error, {ErrorState} from "./error.reducer";
import user, {UserState} from "./user.reducer";

interface RootState {
  form: FormReducer,
  error: ErrorState,
  user: UserState,
}

const rootReducer = combineReducers({
  form: formReducer,
  error,
  user,
});

export {RootState};
export default rootReducer;
