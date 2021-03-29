import { ObjectId } from 'mongoose';
import httpStatus from 'http-status';
import { IUser, UserModel, UserDocument } from '../../models/user.model';
import APIError from '../../utils/APIError';

export const checkDuplicateEmail = (error: any) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    return new APIError({
      message: 'Validation Error',
      errors: {
        body: [
          {
            message: '"email" already exists',
            path: [
              'email',
            ],
            type: 'Duplicate',
            context: {
              label: 'email',
              key: 'email',
            },
          },
        ],
      },
      status: httpStatus.CONFLICT,
      isPublic: true,
      stack: error.stack,
    });
  }
  return error;
};

export const create = async (userData: IUser) => {
  const user = await UserModel.create(userData);
  return user;
};

export const getById = async (userId: ObjectId | string) => {
  const user = await UserModel.findById(userId).where({
    deletedAt: {
      $exists: false,
    },
  });
  return user;
};

export const update = async (currentUser: UserDocument, userData: IUser) => {
  const user = Object.assign(currentUser, userData);
  const updateUser = await user.save();
  return updateUser;
};

export const list = async (customQuery: any, orderBy: string,
  limit: number, page: number, showTotalCount: boolean) => {
  const query = {
    deletedAt: {
      $exists: false,
    },
    ...customQuery,
  };
  const results: {
    totalNotFiltered?: number,
    count?: number,
    results?: IUser[],
  } = {};
  if (showTotalCount) {
    const totalNotFiltered = await UserModel.estimatedDocumentCount(query);
    results.totalNotFiltered = totalNotFiltered;
  }
  let offset = 0;
  let usersCount = 0;
  if (limit > 0) {
    offset = limit * (page - 1);
    usersCount = await UserModel.countDocuments(query);
  }
  const users = await UserModel.find(query).sort(orderBy).limit(limit).skip(offset);
  if (usersCount === 0) {
    usersCount = users.length;
  }
  results.count = usersCount;
  results.results = users;
  return results;
};

export const removeById = async (userId: ObjectId) => {
  await UserModel.findByIdAndUpdate(userId, {
    deletedAt: new Date(),
  });
};
