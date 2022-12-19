import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/HttpExecpetion';

function httpErrorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
}

export default httpErrorMiddleware;
