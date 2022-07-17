import { StatusCodes } from 'http-status-codes';

class HttpError extends Error {
  constructor(public status: StatusCodes, public message: string) {
    super(message);
    this.status = status;
  }
}

export default HttpError;
