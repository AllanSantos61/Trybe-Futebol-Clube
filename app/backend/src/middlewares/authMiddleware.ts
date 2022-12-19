import { NextFunction, Request, Response } from 'express';
import Token from '../utils/Token';

async function authMiddleware(
  req:Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token: string = req.headers.authorization || '';
  res.locals.userIddentifier = await Token.authenticate(token, next);
  next();
}

export default authMiddleware;
