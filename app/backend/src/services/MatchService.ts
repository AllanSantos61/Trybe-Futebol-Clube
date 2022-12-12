import { compare } from 'bcryptjs';
import HttpException from '../utils/HttpExecpetion';
import Token from '../utils/Token';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import { loginSchema } from './validations/schemas';

export default class UserService {
  private _userModel = User;
  private _token = Token;

  private static validateLoginSchema(credentials: ILogin): void {
    const { error } = loginSchema.validate(credentials);
    if (error) {
      const statusCode = error.message.includes('email') ? 401 : 400;
      throw new HttpException(statusCode, error.message);
    }
  }

  async loginService(credentials: ILogin): Promise<string> {
    UserService.validateLoginSchema(credentials);

    const user = await this._userModel.findOne({
      where: { email: credentials.email },
    });

    if (!user || !(await compare(credentials.password, user.password))) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = await this._token.generate(user);
    return token;
  }

  async getRoleService(id: number): Promise<string> {
    const user = await this._userModel.findOne({ where: { id } });
    if (!user) throw new HttpException(404, 'User not found');
    return user.role;
  }
}
