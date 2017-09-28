const enum ErrorActionType {
  CLEAR_ERROR = "clear_error",
  REQUEST_REJECTED = "request_rejected",
}

interface ErrorAction {
  type: ErrorActionType;
  payload: {code: number, message: string} | null;
}

const clearError = (): ErrorAction => ({
  type: ErrorActionType.CLEAR_ERROR,
  payload: null,
});

const requestRejected = (payload: any): ErrorAction => ({
  type: ErrorActionType.REQUEST_REJECTED,
  payload: {
    code: payload.error.code,
    message: payload.error.message,
  },
});

export {ErrorAction, ErrorActionType, clearError, requestRejected};
