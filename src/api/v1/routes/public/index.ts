import express from 'express';
import configRouter from './config.route';

const router = express.Router();

router.use('/config', configRouter);

export default router;
