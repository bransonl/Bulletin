import {Error, FieldError} from "../types/error.type";

const enum ErrorActionType {
  CLEAR_ERROR = "clear_error",
  REQUEST_REJECTED = "request_rejected",
  FORM_REQUEST_REJECTED = "form_request_rejected",
}

interface ErrorAction {
  type: ErrorActionType;
  payload?: Error | FieldError | null;
}

const clearError = (): ErrorAction => ({
  type: ErrorActionType.CLEAR_ERROR,
});

const requestRejected = (payload: any): ErrorAction => ({
  type: ErrorActionType.REQUEST_REJECTED,
  payload: {
    code: payload.error.code,
    message: payload.error.message,
  },
});

const formRequestRejected = (payload: any): ErrorAction => ({
  type: ErrorActionType.FORM_REQUEST_REJECTED,
  payload: {
    code: payload.error.code,
    message: payload.error.message,
    errors: payload.error.errors,
  },
});

export {ErrorAction, ErrorActionType, clearError, requestRejected, formRequestRejected};
