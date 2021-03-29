import httpStatus from 'http-status';
import ExtendableError from './ExtendableError';
import {errors} from "express-validation";

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  constructor(err:
    { message: string,
      errors?: any[] | any, status?: number, isPublic?: boolean, stack?: string },) {
    super({
      message: err.message,
      errors: err.errors,
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      isPublic: err.isPublic === true,
      stack: err.stack,
    });
  }
}

export default APIError;
