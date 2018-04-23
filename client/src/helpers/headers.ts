import {UserToken} from "../shared/types/user";

const baseHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

const createHeaders = (user: UserToken) => (
  Object.assign({
    Authorization: `Bearer ${user.token}`,
  }, baseHeaders)
);

export {baseHeaders, createHeaders};
