import * as jwt from 'jsonwebtoken';
import IAuthorization from '../interfaces/IAuthorization';

const SECRET = process.env.SECRET || 'jwt_scret';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

export default class Token implements IAuthorization {
  public generateToken = async (payload: { id: number, role: string }) => {
    jwt.sign(payload, SECRET, jwtConfig);
  };
}
