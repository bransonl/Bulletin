import {Action} from "redux";

import {Error, FieldError} from "../types/error";

const unauthenticatedError = {
  code: 401,
  message: "Please log in and try again.",
};

const enum ErrorActionType {
  ClearError = "clear_error",
  RequestRejected = "request_rejected",
  FormRequestRejected = "form_request_rejected",
  Unauthenticated = "unauthenticated",
}

interface ErrorAction extends Action {
  type: ErrorActionType;
  payload?: Error | FieldError | null;
}

const clearError = (): ErrorAction => ({
  type: ErrorActionType.ClearError,
});

const requestRejected = (payload: any): ErrorAction => ({
  type: ErrorActionType.RequestRejected,
  payload: {
    code: payload.error.code,
    message: payload.error.message,
  },
});

const formRequestRejected = (payload: any): ErrorAction => ({
  type: ErrorActionType.FormRequestRejected,
  payload: {
    code: payload.error.code,
    message: payload.error.message,
    errors: payload.error.errors,
  },
});

const unauthenticated = (): ErrorAction => ({
  type: ErrorActionType.Unauthenticated,
});

export {
  ErrorAction, ErrorActionType,
  clearError, requestRejected, formRequestRejected, unauthenticated,
};
