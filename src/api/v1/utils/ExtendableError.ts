/**
 * @extends Error
 */
class ExtendableError extends Error {
  errors: any[] | undefined;

  status: number;

  isPublic: boolean;

  constructor(err:
{ message: string, errors?: any[], status: number, isPublic: boolean, stack?: string }) {
    super(err.message);
    this.name = this.constructor.name;
    this.message = err.message;
    this.errors = err.errors;
    this.status = err.status;
    this.isPublic = err.isPublic;
    this.stack = err.stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

export default ExtendableError;
