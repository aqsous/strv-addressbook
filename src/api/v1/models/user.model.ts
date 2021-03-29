import {
  CallbackError, Schema, Document, model,
} from 'mongoose';
import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import moment from 'moment-timezone';
import APIError from '../utils/APIError';

const { env, jwtSecret, jwtExpirationInterval } = require('../../../config/vars');

const roles = ['user', 'staff', 'admin'];

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  description: string;
}

export interface UserDocument extends Document {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  description: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         password:
 *           type: string
 *         createdAt:
 *           type: date
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - staff
 *             - admin
 */
const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
  firstName: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
  },
}, {
  collection: 'User',
  timestamps: true,
  toJSON: { virtuals: true },
});

userSchema.pre<UserDocument>('save', async function save(next: (err?: CallbackError) => void) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * @typedef User
 */
export const UserModel = model<UserDocument>('User', userSchema);
