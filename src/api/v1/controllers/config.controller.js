const httpStatus = require('http-status');
const Config = require('../models/config.model');

/**
 * Get config
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const config = await Config.findOne({ deletedAt: { $lte: new Date() } })
      .sort('-createdAt');
    if (config) {
      res.json(config);
      return;
    }
    const newConfig = await Config.create({
      termsOfServiceUrl: '',
      supportEmail: '',
    });
    res.json(newConfig);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing config
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const oldConfig = await Config.findOne({ deletedAt: { $lte: new Date() } })
      .sort('-createdAt');
    const config = Object.assign(oldConfig, req.body);
    const savedConfig = await config.save();
    res.status(httpStatus.OK);
    res.json(savedConfig);
  } catch (error) {
    next(error);
  }
};
