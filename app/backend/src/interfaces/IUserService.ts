import ILogin from './ILogin';

export interface IUserService {
  validateLoginSchema(credentials: ILogin): void;
  login(credentials: ILogin): Promise<string>;
  getRole(id: number): Promise<string>;
}
