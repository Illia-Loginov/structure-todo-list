import { Task } from '../../models';
import validation from './tasks.validate';
import { errors, regex } from '../../utils';
import {
  dateRange,
  filter,
  filterQuery,
  dateRangeQuery,
  regexQuery,
  dateName
} from '../../interfaces';

const findTaskById = async (taskId: string) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw errors.notFound('Task not found');
  }

  return task;
};

const createRegexQuery = (searchValue: string): regexQuery => {
  return {
    $regex: regex.escape(searchValue),
    $options: 'i'
  };
};

const createDateRangeQuery = (dateRange: dateRange): dateRangeQuery => {
  const { start, end } = dateRange;

  const dateRangeQuery: dateRangeQuery = {};

  if (start) {
    dateRangeQuery['$gte'] = start;
  }

  if (end) {
    dateRangeQuery['$lt'] = end;
  }

  return dateRangeQuery;
};

const createFilterQuery = (filter: filter) => {
  const filterQuery: filterQuery = {};

  if (filter.body) {
    filterQuery.body = createRegexQuery(filter.body);
  }

  for (const date of ['createdAt', 'deadline', 'completed'] as dateName[]) {
    if (filter[date]) {
      filterQuery[date] = createDateRangeQuery(filter[date] as dateRange);
    }
  }

  return filter;
};

const createOne = async (payload: any) => {
  const data = await validation.validateCreateOne(payload);

  return Task.create(data);
};

const getMany = async (payload: any) => {
  const {
    sort = {},
    filter = {},
    skip = 0,
    limit = 0
  } = await validation.validateGetMany(payload);

  return Task.find(createFilterQuery(filter))
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

const deleteOne = async (params: any) => {
  const { taskId } = await validation.validateTaskId(params);

  const task = await findTaskById(taskId);
  await task.remove();

  return task;
};

const completeOne = async (params: any) => {
  const { taskId } = await validation.validateTaskId(params);

  const task = await findTaskById(taskId);
  task.completed = new Date();
  await task.save();

  return task;
};

const updateOne = async (params: any, payload: any) => {
  const { taskId } = await validation.validateTaskId(params);

  const task = await findTaskById(taskId);

  if (task.completed) {
    throw errors.badRequest('Cannot change task that is already completed');
  }

  const data = await validation.validateUpdateOne(payload);

  for (const [key, value] of Object.entries(data)) {
    if (value) {
      (task as any)[key] = value;
    }
  }

  await task.save();

  return task;
};

export default {
  createOne,
  getMany,
  deleteOne,
  completeOne,
  updateOne
};
