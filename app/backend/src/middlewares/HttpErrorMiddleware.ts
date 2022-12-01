import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpExecpetion';

const httpErrorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.log('err', err);
  const { status, message } = err as HttpException;
  if (status) {
    res.status(status || 500).json({ message });
  }
  next();
};

export default httpErrorMiddleware;
