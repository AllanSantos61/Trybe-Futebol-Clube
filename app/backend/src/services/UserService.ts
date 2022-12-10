import { compare } from 'bcryptjs';
import IUserService from '../interfaces/IUserService';
import HttpException from '../utils/HttpExecpetion';
import Token from '../utils/Token';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import validation from './validations/validation';
import { loginSchema } from './validations/schemas';

export default class UserService implements IUserService {
  constructor(
    private _userModel = User,
    private _token = new Token(),
  ) {}

  login = async (login: ILogin): Promise<string> => {
    validation(loginSchema, login);
    const user = await this._userModel.findOne({ where: { email: login.email } });
    if (!user || !(await compare(login.password, user.password))) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const token = this._token.generateToken({ id: user.id, role: user.role });

    return token;
  };
}
