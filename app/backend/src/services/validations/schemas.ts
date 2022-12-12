import * as Joi from 'joi';

const FIELD_REQUIRED = 'All fields must be filled';
const EMAIL_REQUIRED = 'Incorrect email or password';

const loginSchema: Joi.Schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
    'string.email': EMAIL_REQUIRED,
  }),
  password: Joi.string().required().messages({
    'string.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
});

const matchSchema: Joi.Schema = Joi.object({
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
  homeTeam: Joi.number().required(),
  awayTeam: Joi.number().required(),
});

export {
  loginSchema,
  matchSchema,
};
