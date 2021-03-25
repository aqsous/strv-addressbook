const express = require('express');
const { validate } = require('express-validation');
const controller = require('../controllers/auth.controller');
const { authorize, LOGGED_USER } = require('../middlewares/auth');

const {
  login,
  register,
  forgotpassword,
  refresh,
  resetPassword,
} = require('../validations/auth.validation');

const router = express.Router();

router.route('/register')
  .post(validate(register), controller.register);

router.route('/login')
  .post(validate(login), controller.login);

router.route('/forgotpassword')
  .post(validate(forgotpassword), controller.forgotpassword);

router.route('/resetpassword/:token')
  .post(validate(resetPassword), controller.resetPassword);

router.route('/refreshToken')
  .post(validate(refresh), controller.refresh);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     name: Get user
 *     summary: Get user
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

/**
 * TODO: POST /v1/auth/reset-password
 */

module.exports = router;
