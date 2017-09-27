import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import error from "./error.reducer";
import user from "./user.reducer";

const rootReducer = combineReducers({
  form: formReducer,
  error,
  user,
});

export default rootReducer;
