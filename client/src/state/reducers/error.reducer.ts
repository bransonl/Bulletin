import {ErrorAction, ErrorActionType} from "../actions/error.action";
import {Error, FieldError} from "../types/error.type";

type ErrorState = Error | FieldError;

const defaultError: ErrorState = {
  code: null,
  message: "",
  errors: {},
};

const error = (state: ErrorState = defaultError, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case ErrorActionType.CLEAR_ERROR:
      return defaultError;
    case ErrorActionType.REQUEST_REJECTED:
    case ErrorActionType.FORM_REQUEST_REJECTED:
      return action.payload;
    default:
      return state;
  }
};

export {ErrorState};
export default error;
