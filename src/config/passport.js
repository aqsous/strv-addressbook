const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const Sentry = require('@sentry/node');

const { jwtSecret } = require('./vars');
const User = require('../api/v1/models/user.model');

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    Sentry.captureMessage('passport');
    Sentry.captureException(error);
    return done(error, false);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
