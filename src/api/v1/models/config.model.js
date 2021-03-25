const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Config:
 *       type: object
 *       properties:
 *         supportEmail:
 *           type: string
 *         facebook:
 *           type: string
 *         linkedIn:
 *           type: string
 *         instagram:
 *           type: string
 *         twitter:
 *           type: string
 *         youtube:
 *           type: string
 */
const configSchema = new mongoose.Schema(
  {
    supportEmail: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    youtube: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    collection: 'Config',
    timestamps: true,
  },
);

configSchema.statics = {};

/**
 * @typedef Config
 */
const Config = mongoose.model('Config', configSchema);
module.exports = Config;
