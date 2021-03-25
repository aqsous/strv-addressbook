const mongoose = require('mongoose');
const jobService = require('../services/job.service');

/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         type:
 *           type: string
 *           enum:
 *             - image
 *             - video
 *         contentType:
 *           type: string
 *         originalUrl:
 *           type: string
 *         thumbnailUrl:
 *           type: string
 *         mediumUrl:
 *           type: string
 *         largeUrl:
 *           type: string
 */
const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['image', 'video'],
    },
    contentType: {
      type: String,
    },
    originalUrl: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    mediumUrl: {
      type: String,
    },
    largeUrl: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    collection: 'Media',
    timestamps: true,
  },
);

mediaSchema.statics = {};

mediaSchema.post('save', async (doc) => {
  if (doc.createdAt === doc.updatedAt) {
    await jobService.mediaCreated(doc);
  }
});

/**
 * @typedef Media
 */
const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;
