import express from 'express';
import { validate } from 'express-validation';
import * as controller from '../controllers/user.controller';
import { authorize, LOGGED_USER, ADMIN } from '../middlewares/auth';

import userValidation from '../validations/user.validation';

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router
  .route('/')
  .get(authorize(ADMIN), validate(userValidation.listUsers), controller.list)
  .post(authorize(ADMIN), validate(userValidation.createUser), controller.create);

router
  .route('/changePassword')
  .post(authorize(LOGGED_USER), controller.changePassword);

router
  .route('/:userId')
  .get(authorize(ADMIN), controller.get)
  .patch(authorize(ADMIN), validate(userValidation.updateUser), controller.update)
  .delete(authorize(ADMIN), controller.remove);

export default router;
