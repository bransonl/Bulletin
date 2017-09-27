const enum ErrorActionType {
  REQUEST_REJECTED = "request_rejected",
}

interface ErrorAction {
  type: ErrorActionType;
  payload: {code: number, message: string};
}

const requestRejected = (payload: any) => ({
  type: ErrorActionType.REQUEST_REJECTED,
  payload: {
    code: payload.error.code,
    message: payload.error.message,
  },
});

export {ErrorAction, ErrorActionType, requestRejected};
