import express from 'express';
import configRouter from './config.route';
import usersRouter from './users.route';

const router = express.Router();

router.use('/config', configRouter);
router.use('/users', usersRouter);

export default router;
