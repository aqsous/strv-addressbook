import moment from 'moment-timezone';
import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import crypto from "crypto";
import { jwtExpirationInterval, jwtSecret } from '../../../../config/vars';
import { UserDocument, UserModel } from '../../models/user.model';
import { RefreshTokenModel, RefreshTokenDocument } from '../../models/refreshToken.model';
import APIError from '../../utils/APIError';

export const getRefreshToken = async (email: string, token: string) => {
  const currentRefreshToken = await RefreshTokenModel.findOne({
    email,
    token,
    expires: {
      $lte: new Date(),
    },
  });
  return currentRefreshToken;
};

export const generateRefreshToken = async (user: UserDocument) => {
  const userId = user.id;
  const { email } = user;
  const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
  const expires = moment().add(365, 'days').toDate();
  const tokenObject = await RefreshTokenModel.create({
    token, userId, email, expires,
  });
  return tokenObject;
};

export const generateTokenResponse = async (user: UserDocument, accessToken: string,
  oldRefreshToken: RefreshTokenDocument | null = null) => {
  const tokenType = 'Bearer';
  let refreshToken = oldRefreshToken;
  if (oldRefreshToken == null) {
    refreshToken = await generateRefreshToken(user);
  }
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken: refreshToken ? refreshToken.token : '',
    expiresIn,
  };
};

export const getAccessToken = (user: UserDocument) => {
  const playload = {
    // eslint-disable-next-line no-underscore-dangle
    sub: user._id,
    exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
    iat: moment().unix(),
  };
  return jwt.encode(playload, jwtSecret);
};

export const passwordMatches = async (password: string, user: UserDocument) => {
  const didMatch = await bcrypt.compare(password, user.password);
  return didMatch;
};

export const findAndGenerateToken = async (email: string,
  password: string | null = null, refreshObject: RefreshTokenDocument | null = null) => {
  if (!email) {
    throw new APIError({
      message: 'An email is required to generate a token',
    });
  }

  const user = await UserModel.findOne({ email });
  let err: APIError | undefined;
  if (password) {
    if (user && (await passwordMatches(password, user))) {
      return { user, accessToken: getAccessToken(user) };
    }
    err = new APIError({
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
      message: 'Incorrect email or password',
    });
  } else if (user && refreshObject && refreshObject.email === email) {
    return { user, accessToken: getAccessToken(user) };
  } else {
    err = new APIError({
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
      message: 'Incorrect email or refreshToken',
    });
  }
  if (err) {
    throw new APIError(err);
  }
  return null;
};
