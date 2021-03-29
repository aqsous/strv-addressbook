import { Joi } from 'express-validation';

const authValidation = {
  // POST /v1/auth/register
  register: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
    }).unknown(true),
  },
  // POST /v1/auth/login
  login: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .max(128),
    }).unknown(true),
  },
  // POST /v1/auth/refresh
  refresh: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      refreshToken: Joi.string().required(),
    }).unknown(true),
  },
};

export default authValidation;
