import express from 'express';
import { validate } from 'express-validation';
import * as controller from '../controllers/contact.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';

import contactValidation from '../validations/contact.validation';

const router = express.Router();

/**
 * @swagger
 * /contacts:
 *   post:
 *     tags:
 *       - Contact
 *     name: Create contact
 *     summary: Create contact
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
router
  .route('/')
  .post(authorize(LOGGED_USER), validate(contactValidation.createContact), controller.create);

export default router;
