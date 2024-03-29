import express, { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import helmet from 'helmet';
import { StatusError } from './interfaces';
import logger from './logger';
import { morgan } from './middleware';
import { tasksRoutes } from './routes';
import { errors } from './utils';

const app = express();

app.use(helmet());
app.use(morgan);
app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('To-do list TypeScript app');
});
app.use('/tasks', tasksRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(errors.notFound('Not found'));
});

app.use(
  (
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
  }
);

export default app;
