import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { handler as errorHandler } from '../middlewares/error';
import CustomRequest from '../utils/CustomRequest';
import * as service from '../services/internal/users.service';
import {checkDuplicateEmail} from "../services/internal/users.service";

/**
 * Load user and append to req.
 * @public
 */
export const load = async (req: CustomRequest, res: Response, next: NextFunction, id: string) => {
  try {
    const user = await service.getById(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return errorHandler(error, req, res, next);
  }
};

/**
 * Get user
 * @public
 */
export const get = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.json(req.locals.user);
  } catch (error) {
    next(error);
  }
};

/**
 * change password
 * @public
 */
export const changePassword = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const didMatch = await req.user.passwordMatches(oldPassword);
  if (didMatch) {
    req.user.password = newPassword;
    await req.user.save();
    res.json(req.user);
  } else {
    res.status(400).json({
      message: "Passwords don't match",
    });
  }
};

/**
 * Create new user
 * @public
 */
export const create = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const savedUser = await service.create(req.body);
    res.status(httpStatus.CREATED);
    res.json(savedUser);
  } catch (error) {
    next(checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
export const update = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const savedUser = await service.update(req.locals.user, req.body);
    res.status(httpStatus.OK);
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user list
 * @public
 */
export const list = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const query = { };
    // set query params
    const limitQuery: string = req.query.limit as string;
    const pageQuery: string = req.query.page as string;
    const limit = parseInt(limitQuery || '0', 10) || 0;
    const page = parseInt(pageQuery || '1', 10) || 1;
    let orderBy = req.query.order || 'createdAt';
    // const search = req.query.search;
    if (req.query.orderDirection === 'desc') {
      orderBy = `-${orderBy}`;
    }
    const results = await service.list(query, orderBy as string, limit, page, true);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
export const remove = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { user } = req.locals;
    await service.removeById(user._id);
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
