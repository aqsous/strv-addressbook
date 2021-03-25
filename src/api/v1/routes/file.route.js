const express = require('express');
const Multer = require('multer');

const controller = require('../controllers/file.controller');
const { authorize, LOGGED_USER } = require('../middlewares/auth');

const multer = Multer({
  storage: Multer.MemoryStorage,
});

const router = express.Router();

router.post('/imageUpload', authorize([LOGGED_USER]), multer.single('image'), controller.uploadImage);

module.exports = router;
