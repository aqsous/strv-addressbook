import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as service from '../services/internal/config.service';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const config = await service.get();
    res.json(config);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const config = await service.update(req.body);
    res.status(httpStatus.OK);
    res.json(config);
  } catch (error) {
    next(error);
  }
};
