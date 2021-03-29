import { Document, Schema, model } from 'mongoose';

export interface IConfig {
  supportEmail?: string;
}

export interface ConfigDocument extends Document {
  supportEmail?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Config:
 *       type: object
 *       properties:
 *         supportEmail:
 *           type: string
 */
const configSchema = new Schema(
  {
    supportEmail: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    collection: 'Config',
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

/**
 * @typedef Config
 */
export const ConfigModel = model<ConfigDocument>('Config', configSchema);
