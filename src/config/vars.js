// const path = require('path');
// const dotenv = require('dotenv-safe');

const env = process.env.NODE_ENV || 'development';

// if (env === 'development') {
//   dotenv.config({
//     path: path.join(__dirname, '../../.env'),
//     sample: path.join(__dirname, '../../.env.dev'),
//   });
// }

const port = process.env.PORT || 1337;

module.exports = {
  env,
  port,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES || 43000,
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/temp',
  },
  serverUrl: process.env.SERVER_URL || `http://localhost:${port}`,
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  websiteSubdomain: process.env.WEBSITE_SUBDOMAIN || 'web',
  dashboardSubdomain: process.env.DASHBOARD_SUBDOMAIN || 'dashboard',
};
