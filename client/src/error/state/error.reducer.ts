import {ErrorAction, ErrorActionType} from "./error.action";
import {Error, FieldError} from "../types/error";

type ErrorState = Error | FieldError;

const defaultError: ErrorState = {
  code: null,
  message: "",
  errors: {},
};

const error = (
  state: ErrorState = defaultError,
  action: ErrorAction,
): ErrorState => {
  switch (action.type) {
    case ErrorActionType.ClearError:
      return defaultError;
    case ErrorActionType.RequestRejected:
    case ErrorActionType.FormRequestRejected:
    case ErrorActionType.Unauthenticated:
      return action.payload;
    default:
      return state;
  }
};

export {ErrorState};
export default error;
