export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type ICreateUser = Omit<IUser, 'id'>;

export type IReturnUser = Omit<IUser, 'password'>;
