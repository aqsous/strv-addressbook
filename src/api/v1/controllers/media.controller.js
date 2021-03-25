const httpStatus = require('http-status');
const { omit } = require('lodash');
const Media = require('../models/media.model');

/**
 * Load media and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const media = await Media.findById(id).where({ deletedAt: { $lte: new Date() } });
    req.locals = { media };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get media
 * @public
 */
exports.get = (req, res) => res.json(req.locals.media);

/**
 * Create new media
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const media = new Media(req.body);
    const savedMedia = await media.save();
    res.status(httpStatus.CREATED);
    res.json(savedMedia);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing media
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const updatedMedia = omit(req.body, ['deletedAt']);
    const media = Object.assign(req.locals.media, updatedMedia);
    const savedMedia = await media.save();
    res.status(httpStatus.OK);
    res.json(savedMedia);
  } catch (error) {
    next(error);
  }
};

/**
 * Get media list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const query = { deletedAt: { $lte: new Date() } };
    const totalNotFiltered = await Media.estimatedDocumentCount(query);
    // set query params
    let mediasCount = 0;
    const limit = parseInt(req.query.limit, 10) || 0;
    const page = parseInt(req.query.page, 10) || 1;
    let orderBy = req.query.order || 'createdAt';
    // const search = req.query.search;
    let perPage = 0;
    let offset = 0;
    if (req.query.orderDirection === 'desc') {
      orderBy = `-${orderBy}`;
    }
    if (limit > 0) {
      perPage = limit;
      offset = perPage * (page - 1);
      mediasCount = await Media.countDocuments(query);
    }
    const medias = await Media.find(query).sort(orderBy).limit(perPage).skip(offset);
    if (mediasCount === 0) {
      mediasCount = medias.length;
    }
    res.json({ results: medias, total: mediasCount, totalNotFiltered });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete media
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    const { media } = req.locals;
    media.deletedAt = new Date();
    await media.save();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
