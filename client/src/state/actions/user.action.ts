import {UserCredentials, UserToken} from "../types/user.type";

const enum UserActionType {
  CLEAR_USER = "clear_user",
  LOGIN_REQUEST = "login_request",
  SIGNUP_REQUEST = "signup_request",
  IDENTIFY_USER = "identify_user",
}

interface UserAction {
  type: UserActionType;
  payload?: UserCredentials | UserToken;
}

const clearUser = (): UserAction => ({
  type: UserActionType.CLEAR_USER,
});

const loginRequest = (username: string, password: string): UserAction => ({
  type: UserActionType.LOGIN_REQUEST,
  payload: {username, password},
});

const identifyUser = (payload: any): UserAction => ({
  type: UserActionType.IDENTIFY_USER,
  payload,
});

const signupRequest = (username: string, password: string): UserAction => ({
  type: UserActionType.SIGNUP_REQUEST,
  payload: {username, password},
});

export {
  UserAction, UserActionType,
  clearUser, identifyUser, loginRequest, signupRequest,
};
