import {UserAction, UserActionType} from "../actions/user.action";
import {UserToken} from "../types/user.type";

const user = (state = {}, action: UserAction) => {
  switch (action.type) {
    case UserActionType.LOGIN_FULFILLED:
      return action.payload as UserToken;
    default:
      return state;
  }
};

export default user;
