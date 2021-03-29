import express from 'express';
import { validate } from 'express-validation';
import * as controller from '../controllers/auth.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';

import authValidation from '../validations/auth.validation';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     name: Register user
 *     summary: Register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Register successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   $ref: '#/definitions/Token'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
router.route('/register')
  .post(validate(authValidation.register), controller.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     name: Login
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   $ref: '#/definitions/Token'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
router.route('/login')
  .post(validate(authValidation.login), controller.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Auth
 *     name: RefreshToken
 *     summary: RefreshToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *             required:
 *               - email
 *               - refreshToken
 *     responses:
 *       200:
 *         description: refresh successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   $ref: '#/definitions/Token'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 */
router.route('/refresh')
  .post(validate(authValidation.refresh), controller.refresh);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     name: Get current user
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.route('/me')
  .get(authorize([LOGGED_USER]), controller.me);

export default router;
