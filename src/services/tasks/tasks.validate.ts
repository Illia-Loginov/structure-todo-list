import Joi from 'joi';
import { ITask } from '../../interfaces';

export const validateCreateOne = (payload: any): Promise<ITask> => {
  const schema = Joi.object({
    body: Joi.string().min(1).max(200).required(),
    deadline: Joi.date().greater('now').optional()
  });

  return schema.validateAsync(payload);
};

export const validateGetMany = (payload: any) => {
  const dateInterval = Joi.object({
    start: Joi.date().optional(),
    end: Joi.date().optional()
  });

  const schema = Joi.object({
    sort: Joi.object({
      createdAt: Joi.string().valid('asc', 'desc').optional(),
      deadline: Joi.string().valid('asc', 'desc').optional(),
      completed: Joi.string().valid('asc', 'desc').optional()
    }).optional(),
    filter: Joi.object({
      body: Joi.string().min(0).max(200).optional(),
      createdAt: dateInterval.optional(),
      deadline: dateInterval.optional(),
      completed: dateInterval.optional()
    }).optional(),
    skip: Joi.number().min(0).optional(),
    limit: Joi.number().min(0).optional()
  });

  return schema.validateAsync(payload);
};

export const validateTaskId = (params: any): Promise<{ taskId: string }> => {
  const schema = Joi.object({
    taskId: Joi.string().hex().length(24).required()
  });

  return schema.validateAsync(params);
};

export const validateUpdateOne = (payload: any): Promise<Partial<ITask>> => {
  const schema = Joi.object({
    body: Joi.string().min(1).max(200).optional(),
    deadline: Joi.date().greater('now').optional()
  });

  return schema.validateAsync(payload);
};
