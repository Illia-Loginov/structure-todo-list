import { NextFunction, Request, Response } from 'express';
import { errors } from '../utils';

export default (req: Request, res: Response, next: NextFunction) => {
  next(errors.notFound('Not found'));
};
