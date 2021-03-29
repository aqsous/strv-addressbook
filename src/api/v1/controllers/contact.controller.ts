import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import * as service from '../services/external/firebaseAdmin.service';
import { IContact } from '../models/contact.model';
import CustomRequest from '../utils/CustomRequest';

/**
 * Create new user
 * @public
 */
export const create = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const data: IContact = req.body;
    data.userId = req.user.id;
    const savedContact = await service.create(data);
    res.status(httpStatus.CREATED);
    res.json({ id: savedContact });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.json({});
  } catch (error) {
    next(error);
  }
};
