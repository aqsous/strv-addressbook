const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).where({ deletedAt: { $lte: new Date() } });
    req.locals = { user };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user);

/**
 * change password
 * @public
 */
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const didMatch = await req.user.passwordMatches(oldPassword);
  if (didMatch) {
    req.user.password = newPassword;
    await req.user.save();
    res.json(req.user);
  } else {
    res.status(400).json({
      message: "Passwords don't match",
    });
  }
};

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser);
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
    const updatedUser = omit(req.body, [ommitRole, 'deletedAt']);
    const user = Object.assign(req.locals.user, updatedUser);
    const savedUser = await user.save();
    res.status(httpStatus.OK);
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing user dashboardSettings
 * @public
 */
exports.updateDashboardSettings = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      dashboardSettings: req.body.dashboardSettings,
    }, { new: true });
    res.status(httpStatus.OK);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const query = { deletedAt: { $lte: new Date() } };
    const totalNotFiltered = await User.estimatedDocumentCount(query);
    // set query params
    let usersCount = 0;
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
      usersCount = await User.countDocuments(query);
    }
    const users = await User.find(query).sort(orderBy).limit(perPage).skip(offset);
    if (usersCount === 0) {
      usersCount = users.length;
    }
    res.json({ results: users, total: usersCount, totalNotFiltered });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    const { user } = req.locals;
    user.deletedAt = new Date();
    await user.save();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};
