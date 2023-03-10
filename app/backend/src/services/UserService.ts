import { compare } from 'bcryptjs';
import HttpException from '../utils/HttpExecpetion';
import Token from '../utils/Token';
import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import { loginSchema } from './validations/schemas';
import { IUserService } from '../interfaces/IUserService';

export default class UserService implements IUserService {
  private _userModel = User;
  private _token = Token;

  validateLoginSchema(credentials: ILogin): void {
    console.log(this._userModel);
    const { error } = loginSchema.validate(credentials);
    if (error) {
      const statusCode = error.message.includes('email') ? 401 : 400;
      throw new HttpException(statusCode, error.message);
    }
  }

  async login(credentials: ILogin): Promise<string> {
    this.validateLoginSchema(credentials);
    const user = await this._userModel.findOne({
      where: { email: credentials.email },
    });
    if (!user || !(await compare(credentials.password, user.password))) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    const token = await this._token.generate(user);
    return token;
  }

  async getRole(id: number): Promise<string> {
    const user = await this._userModel.findOne({ where: { id } });
    if (!user) throw new HttpException(404, 'User not found');
    return user.role;
  }
}
