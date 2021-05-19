export interface User {
  name: string;
  email: string;
  password: string;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IDataStoredInToken {
  _id: string;
}