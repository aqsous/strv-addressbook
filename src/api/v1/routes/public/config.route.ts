import express from 'express';
import * as controller from '../../controllers/config.controller';

const router = express.Router();

/**
* @swagger
* /public/config:
*   get:
*     tags:
*       - Config
*     name: Get config
*     summary: Get public config
*     responses:
*       200:
*         description: Successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Config'
*       401:
*         $ref: '#/components/responses/UnauthorizedError'
*/
router
  .route('/')
  .get(controller.get);

export default router;
