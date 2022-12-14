import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import ITokenPayload from '../interfaces/IToken';
import { IUser } from '../interfaces/IUser';

const SECRET = process.env.SECRET || 'jwt_secret';

export default class Token {
  static generate({ id, email }: IUser): string {
    return jwt.sign({ data: { id, email } }, SECRET, {
      expiresIn: '24h',
      algorithm: 'HS256',
    });
  }

  static async authenticate(
    token: string,
    next: NextFunction,
  ): Promise<ITokenPayload | void> {
    try {
      const payload = await jwt.verify(token, SECRET);
      return payload as ITokenPayload;
    } catch (e) {
      return next({ status: 401, message: 'Token must be a valid token' });
    }
  }
}
