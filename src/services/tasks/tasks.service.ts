import { Task } from '../../models';
import * as validation from './tasks.validate';
import { errors, regex } from '../../utils';

export const createOne = async (payload: any) => {
    const data = await validation.validateCreateOne(payload);

    return Task.create(data);
}

export const getMany = async (payload: any) => {
    const { sort = {}, filter = {}, skip = 0, limit = 0 } = await validation.validateGetMany(payload);

    if(filter.body) {
        filter.body = {
            $regex: regex.escape(filter.body),
            $options: 'i'
        }
    }

    return Task.find(filter).sort(sort).skip(skip).limit(limit);
}

export const deleteOne = async (params: any) => {
    const { taskId } = await validation.validateTaskId(params);

    const task = await Task.findById(taskId);
    if(!task) {
        throw errors.notFound('Task not found');
    }

    await task.remove();

    return task;
}

export const completeOne = async (params: any) => {
    const { taskId } = await validation.validateTaskId(params);

    const task = await Task.findById(taskId);
    if(!task) {
        throw errors.notFound('Task not found');
    }

    task.completed = new Date();

    await task.save();

    return task;
}

export const updateOne = async (params: any, payload: any) => {
    const { taskId } = await validation.validateTaskId(params);

    const task = await Task.findById(taskId);
    if(!task) {
        throw errors.notFound('Task not found');
    }

    if(task.completed) {
        throw errors.badRequest('Cannot change task that is already completed');
    }

    const data = await validation.validateUpdateOne(payload);

    for(const [key, value] of Object.entries(data)) {
        if(value) {
            (task as any)[key] = value;
        }
    }

    await task.save();

    return task;
}