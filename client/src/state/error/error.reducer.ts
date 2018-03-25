import {ErrorAction, ErrorActionType} from "./error.action";
import {Error, FieldError} from "../../types/error";

type ErrorState = Error | FieldError;

const defaultError: ErrorState = {
  code: null,
  message: "",
  errors: {},
};

const error = (state: ErrorState = defaultError, action: ErrorAction):
ErrorState => {
  switch (action.type) {
    case ErrorActionType.CLEAR_ERROR:
      return defaultError;
    case ErrorActionType.REQUEST_REJECTED:
    case ErrorActionType.FORM_REQUEST_REJECTED:
    case ErrorActionType.UNAUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
};

export {ErrorState};
export default error;
