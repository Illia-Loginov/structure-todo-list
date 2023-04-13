import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { errors } from '../utils';
import { StatusError } from '../interfaces';
import logger from '../logger';

export default (
  error: Error | StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ('statusCode' in error) {
    res.status(error.statusCode).json(error.message);
  } else if (error instanceof Joi.ValidationError) {
    res.status(400).json(error.message);
  } else {
    logger.error(error);
    res.sendStatus(500);
  }
};
