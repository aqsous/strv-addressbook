const express = require('express');

const controller = require('../../controllers/translate.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(authorize([ADMIN]), controller.translate);

module.exports = router;
