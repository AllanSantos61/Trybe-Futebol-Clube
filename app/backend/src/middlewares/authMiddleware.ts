import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/HttpExecpetion';

async function authMiddleware(req:Request, _res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;
  if (!token) {
    throw new HttpException(401, 'Token not found');
  }
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET as string);
    req.body.user = payload;
    next();
  } catch (err) {
    throw new HttpException(401, 'Token must be a valid token');
  }
}

export default authMiddleware;
