import { NextFunction, Request, Response } from 'express';
import { tasksService } from '../services';

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await tasksService.createOne(req.body);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await tasksService.getMany(req.query);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await tasksService.deleteOne(req.params);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const completeOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await tasksService.completeOne(req.params);

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await tasksService.updateOne(req.params, req.body);

    res.json(task);
  } catch (error) {
    next(error);
  }
};
