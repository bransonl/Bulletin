import {ErrorAction, ErrorActionType} from "../actions/error.action";
import {Error} from "../types/error.type";

const error = (state: Error = {code: null, message: ""}, action: ErrorAction): Error => {
  switch (action.type) {
    case ErrorActionType.REQUEST_REJECTED:
      return action.payload;
    default:
      return state;
  }
};

export default error;
