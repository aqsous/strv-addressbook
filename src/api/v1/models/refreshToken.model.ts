import { Document, model, Schema } from 'mongoose';

export interface IRefreshToken {
  token: string;
  email: string;
  expires: Date;
  userId: Schema.Types.ObjectId;
}

export interface RefreshTokenDocument extends Document {
  token: string;
  email: string;
  expires: Date;
  userId: Schema.Types.ObjectId;
}

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: 'String',
    ref: 'User',
    required: true,
  },
  expires: {
    type: Date,
  },
}, {
  collection: 'RefreshToken',
  timestamps: true,
  toJSON: { virtuals: true },
});

/**
 * @typedef RefreshTokenModel
 */
export const RefreshTokenModel = model<RefreshTokenDocument>('RefreshToken', refreshTokenSchema);
