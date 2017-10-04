import {ErrorAction, ErrorActionType} from "../actions/error.action";
import {Error, FieldError} from "../types/error.type";

const error = (state: Error | FieldError = {code: null, message: "", errors: {}}, action: ErrorAction):
  Error | FieldError => {
  switch (action.type) {
    case ErrorActionType.CLEAR_ERROR:
      return {code: null, message: ""};
    case ErrorActionType.REQUEST_REJECTED:
    case ErrorActionType.FORM_REQUEST_REJECTED:
      return action.payload;
    default:
      return state;
  }
};

export default error;
