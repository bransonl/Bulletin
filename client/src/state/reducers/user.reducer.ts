import {UserAction, UserActionType} from "../actions/user.action";
import {UserCredentials, UserToken} from "../types/user.type";

type UserState = UserCredentials | UserToken | null;

const user = (state: UserState = null, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionType.CLEAR_USER:
      return null;
    case UserActionType.IDENTIFY_USER:
      return action.payload as UserToken;
    default:
      return state;
  }
};

export {UserState};
export default user;
