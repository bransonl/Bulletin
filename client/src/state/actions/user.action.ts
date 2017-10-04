import {UserCredentials, UserToken} from "../types/user.type";

const enum UserActionType {
  LOGIN_REQUEST = "login_request",
  SIGNUP_REQUEST = "signup_request",
  IDENTIFY_USER = "identify_user",
}

interface UserAction {
  type: UserActionType;
  payload: UserCredentials | UserToken;
}

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

export {UserAction, UserActionType, identifyUser, loginRequest, signupRequest};
