const express = require('express');
const controller = require('../../controllers/config.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(authorize([ADMIN]), controller.get)
  .post(authorize([ADMIN]), controller.update);

module.exports = router;
