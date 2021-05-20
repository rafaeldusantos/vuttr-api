export interface IUser extends Ilogin {
  _id: string;
  name: string;
}

export interface Ilogin {
  email: string;
  password: string;
}
export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IDataStoredId {
  _id: string;
}

export interface FilterUser {
  name?: string;
  email?: string;
  password?: string;
}
