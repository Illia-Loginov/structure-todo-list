import Joi from 'joi';
import { ITask } from '../../interfaces';

const dateRange = Joi.object({
  start: Joi.date().optional(),
  end: Joi.date().optional()
});

const createOneSchema = Joi.object({
  body: Joi.string().min(1).max(200).required(),
  deadline: Joi.date().greater('now').optional()
});

const getManySchema = Joi.object({
  sort: Joi.object({
    createdAt: Joi.string().valid('asc', 'desc').optional(),
    deadline: Joi.string().valid('asc', 'desc').optional(),
    completed: Joi.string().valid('asc', 'desc').optional()
  }).optional(),
  filter: Joi.object({
    body: Joi.string().min(0).max(200).optional(),
    createdAt: dateRange.optional(),
    deadline: dateRange.optional(),
    completed: dateRange.optional()
  }).optional(),
  skip: Joi.number().min(0).optional(),
  limit: Joi.number().min(0).optional()
});

const taskIdSchema = Joi.object({
  taskId: Joi.string().hex().length(24).required()
});

const updateOneSchema = Joi.object({
  body: Joi.string().min(1).max(200).optional(),
  deadline: Joi.date().greater('now').optional()
});

const validateCreateOne = (payload: any): Promise<ITask> => {
  return createOneSchema.validateAsync(payload);
};

const validateGetMany = (payload: any) => {
  return getManySchema.validateAsync(payload);
};

const validateTaskId = (params: any): Promise<{ taskId: string }> => {
  return taskIdSchema.validateAsync(params);
};

const validateUpdateOne = (payload: any): Promise<Partial<ITask>> => {
  return updateOneSchema.validateAsync(payload);
};

export default {
  validateCreateOne,
  validateGetMany,
  validateTaskId,
  validateUpdateOne
};
