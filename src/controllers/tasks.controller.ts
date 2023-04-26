import { NextFunction, Request, RequestHandler, Response } from 'express';
import { TaskService } from '../services';
import { TaskRepository } from '../repositories';

const tasksService = new TaskService(new TaskRepository());

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  const task = await tasksService.createOne(req.body);

  res.json(task);
};

const getMany = async (req: Request, res: Response, next: NextFunction) => {
  const tasks = await tasksService.getMany(req.query);

  res.json(tasks);
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const task = await tasksService.deleteOne(req.params);

  res.json(task);
};

const completeOne = async (req: Request, res: Response, next: NextFunction) => {
  const task = await tasksService.completeOne(req.params);

  res.json(task);
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  const task = await tasksService.updateOne(req.params, req.body);

  res.json(task);
};

const errorCatcher = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default {
  createOne: errorCatcher(createOne),
  getMany: errorCatcher(getMany),
  deleteOne: errorCatcher(deleteOne),
  completeOne: errorCatcher(completeOne),
  updateOne: errorCatcher(updateOne)
};
