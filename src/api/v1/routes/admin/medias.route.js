const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/media.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const {
  listMedias,
  createMedia,
  updateMedia,
} = require('../../validations/media.validation');

const router = express.Router();

/**
 * Load media when API with mediaId route parameter is hit
 */
router.param('mediaId', controller.load);

router
  .route('/')
  .get(authorize([ADMIN]), validate(listMedias), controller.list)
  .post(authorize([ADMIN]), validate(createMedia), controller.create);

router
  .route('/:mediaId')
  .get(authorize([ADMIN]), controller.get)
  .patch(authorize([ADMIN]), validate(updateMedia), controller.update)
  .delete(authorize([ADMIN]), controller.remove);

module.exports = router;
