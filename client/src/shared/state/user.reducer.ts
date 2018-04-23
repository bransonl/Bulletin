import {UserAction, UserActionType} from "./user.action";
import {UserCredentials, UserToken} from "../types/user";

type UserState = UserToken;

const user = (state: UserState = null, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionType.ClearUser:
      return null;
    case UserActionType.IdentifyUser:
      return action.payload as UserToken;
    default:
      return state;
  }
};

export {UserState};
export default user;
