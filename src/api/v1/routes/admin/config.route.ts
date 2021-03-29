import express from 'express';
import * as controller from '../../controllers/config.controller';
import { authorize, ADMIN } from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(authorize([ADMIN]), controller.get)
  .post(authorize([ADMIN]), controller.update);

export default router;
