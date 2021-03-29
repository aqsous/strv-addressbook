const path = require('path');
const dotenv = require('dotenv-safe');

export const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  dotenv.config({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.dev'),
  });
}

export const port: number = parseInt(process.env.PORT || '1337', 10);
export const jwtSecret: string = process.env.JWT_SECRET || 'secret';
export const jwtExpirationInterval: number = parseInt(process.env.JWT_EXPIRATION_MINUTES || '43000', 10);
export const mongoUri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/temp';
export const serverUrl: string = process.env.SERVER_URL || `http://localhost:${port}`;
