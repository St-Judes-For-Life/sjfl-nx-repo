export type LoginRequest = {
  usernameOrEmail: string;
  password: string;
};

export type TokenResponse = {
  token: string;
};
