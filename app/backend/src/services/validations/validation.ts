import * as Joi from 'joi';
import HttpException from '../../utils/HttpExecpetion';
import { mapStatusCode, statusCode } from './httpCodeError';

const validation = (schema: Joi.Schema, body: unknown) => {
  const { error } = schema.validate(body);
  if (error) {
    const { message, details } = error;
    const httpError = mapStatusCode(details[0].type as keyof typeof statusCode);
    throw new HttpException(httpError, message);
  }
};

export default validation;
