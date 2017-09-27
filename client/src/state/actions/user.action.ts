import {UserCredentials, UserToken} from "../types/user.type";

const enum UserActionType {
  LOGIN_REQUEST = "login_request",
  LOGIN_FULFILLED = "login_fulfill",
}

interface UserAction {
  type: UserActionType;
  payload: UserCredentials | UserToken;
}

const loginRequest = (username: string, password: string): UserAction => ({
  type: UserActionType.LOGIN_REQUEST,
  payload: {username, password},
});

const loginFulfilled = (payload: any): UserAction => ({
  type: UserActionType.LOGIN_FULFILLED,
  payload,
});

export {UserAction, UserActionType, loginFulfilled, loginRequest};
