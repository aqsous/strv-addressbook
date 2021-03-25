const express = require('express');
const { validate } = require('express-validation');
const controller = require('../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const {
  listUsers,
  createUser,
  updateUser,
} = require('../validations/user.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
  .route('/')
  .get(authorize(ADMIN), validate(listUsers), controller.list)
  .post(authorize(ADMIN), validate(createUser), controller.create);

router
  .route('/changePassword')
  .post(authorize(LOGGED_USER), controller.changePassword);

router
  .route('/updateDashboardSettings')
  .post(authorize(LOGGED_USER), controller.updateDashboardSettings);

router
  .route('/:userId')
  .get(authorize(ADMIN), controller.get)
  .patch(authorize(ADMIN), validate(updateUser), controller.update)
  .delete(authorize(ADMIN), controller.remove);

module.exports = router;
