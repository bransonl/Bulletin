interface UserCredentials {
  username: string;
  password: string;
}

interface UserToken {
  token: string;
  userId: number;
  username: string;
}

export {UserCredentials, UserToken};
