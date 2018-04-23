import {Action} from "redux";

import {UserCredentials, UserToken} from "../types/user";

const enum UserActionType {
  ClearUser = "clear_user",
  LoginRequest = "login_request",
  SignupRequest = "signup_request",
  IdentifyUser = "identify_user",
}

interface UserAction extends Action {
  type: UserActionType;
  payload?: UserCredentials | UserToken;
}

const clearUser = (): UserAction => ({
  type: UserActionType.ClearUser,
});

const identifyUser = (payload: UserToken): UserAction => ({
  type: UserActionType.IdentifyUser,
  payload,
});

const loginRequest = (username: string, password: string): UserAction => ({
  type: UserActionType.LoginRequest,
  payload: {username, password},
});

const signupRequest = (username: string, password: string): UserAction => ({
  type: UserActionType.SignupRequest,
  payload: {username, password},
});

export {
  UserAction, UserActionType,
  clearUser, identifyUser, loginRequest, signupRequest,
};
