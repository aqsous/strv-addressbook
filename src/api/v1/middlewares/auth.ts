import httpStatus from 'http-status';
import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

import APIError from '../utils/APIError';

const User = require('../models/user.model');

export const ADMIN = 'admin';
export const LOGGED_USER = '_loggedUser';

export const handleJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
  roles: string[],
) => async (err: any, user: any) => {
  const error = err;
  // const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });

  if (error || !user) next(apiError);
  // try {
  //   // await logIn(user, { session: false });
  // } catch (e) {
  //   return next(apiError);
  // }

  if (roles.includes(LOGGED_USER)) {
    // if (user.role !== 'admin' && req.params.userId !== user.id) {
    //   apiError.status = httpStatus.FORBIDDEN;
    //   apiError.message = 'Forbidden';
    //   return next(apiError);
    // }
  } else if (!roles.includes(user.role)) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }

  if (user.isBlocked) {
    return next(apiError);
  }

  req.user = user;
  return next();
};

export const authorize = (roles = User.roles) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => passport.authenticate(
  'jwt',
  { session: false },
  handleJWT(req, res, next, roles),
)(req, res, next);
