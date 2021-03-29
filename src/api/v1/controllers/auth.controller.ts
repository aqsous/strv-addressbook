import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as service from '../services/internal/auth.service';
import { create as createUser, checkDuplicateEmail } from '../services/internal/users.service';
import CustomRequest from '../utils/CustomRequest';

/**
 * Returns jwt token if registration was successful
 * @public
 */
export const register = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const user = await createUser(req.body);
    const token = await service.generateTokenResponse(user, service.getAccessToken(user));
    res.status(httpStatus.CREATED);
    res.json({ token, user });
  } catch (error) {
    next(checkDuplicateEmail(error));
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
export const login = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userData = await service.findAndGenerateToken(
      req.body.email, req.body.password,
    );
    if (userData == null) {
      return;
    }
    const token = await service.generateTokenResponse(userData.user, userData.accessToken);
    res.json({ token, user: userData.user });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
export const refresh = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await service.getRefreshToken(
      email, refreshToken,
    );
    const userData = await service.findAndGenerateToken(
      req.body.email, null, refreshObject,
    );
    if (userData == null) {
      return;
    }
    const token = await service.generateTokenResponse(
      userData.user, userData.accessToken, refreshObject,
    );
    res.json({ token, user: userData.user });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
export const me = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};
