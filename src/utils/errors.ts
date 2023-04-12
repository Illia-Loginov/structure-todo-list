import { StatusError } from '../interfaces';

export const badRequest = (message: string): StatusError => {
  const error: StatusError = new StatusError(message, 400);
  return error;
};

export const notFound = (message: string): StatusError => {
  const error: StatusError = new StatusError(message, 404);
  return error;
};
