import { ExtractJwt, Strategy as JwtStrategy, VerifiedCallback } from 'passport-jwt';

import { jwtSecret } from './vars';

const { UserModel } = require('../api/v1/models/user.model');

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload: any, done: VerifiedCallback) => {
  try {
    const user = await UserModel.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};
const jwtStrategy = new JwtStrategy(jwtOptions, jwt);

export { jwtStrategy };
