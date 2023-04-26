import validation from './tasks.validate';
import { errors, regex } from '../../utils';
import {
  dateRange,
  filter,
  filterQuery,
  dateRangeQuery,
  regexQuery,
  dateName,
  Repository,
  ITask
} from '../../interfaces';
export class TaskService {
  private repository;

  constructor(repository: Repository<ITask>) {
    this.repository = repository;
  }

  private findTaskById = async (taskId: string) => {
    const task = await this.repository.findById(taskId);
    if (!task) {
      throw errors.notFound('Task not found');
    }

    return task;
  };

  private createRegexQuery = (searchValue: string): regexQuery => {
    return {
      $regex: regex.escape(searchValue),
      $options: 'i'
    };
  };

  private createDateRangeQuery = (dateRange: dateRange): dateRangeQuery => {
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

  private createFilterQuery = (filter: filter) => {
    const filterQuery: filterQuery = {};

    if (filter.body) {
      filterQuery.body = this.createRegexQuery(filter.body);
    }

    for (const date of ['createdAt', 'deadline', 'completed'] as dateName[]) {
      if (filter[date]) {
        filterQuery[date] = this.createDateRangeQuery(
          filter[date] as dateRange
        );
      }
    }

    return filter;
  };

  createOne = async (payload: any) => {
    const data = await validation.validateCreateOne(payload);

    return this.repository.create(data);
  };

  getMany = async (payload: any) => {
    const {
      sort = {},
      filter = {},
      skip = 0,
      limit = 0
    } = await validation.validateGetMany(payload);

    return this.repository.find(
      this.createFilterQuery(filter),
      sort,
      skip,
      limit
    );
  };

  deleteOne = async (params: any) => {
    const { taskId } = await validation.validateTaskId(params);

    const task = await this.findTaskById(taskId);

    return this.repository.delete(task);
  };

  completeOne = async (params: any) => {
    const { taskId } = await validation.validateTaskId(params);

    const task = await this.findTaskById(taskId);

    return this.repository.update(task, { completed: new Date() });
  };

  updateOne = async (params: any, payload: any) => {
    const { taskId } = await validation.validateTaskId(params);

    const task = await this.findTaskById(taskId);

    if (task.completed) {
      throw errors.badRequest('Cannot change task that is already completed');
    }

    const data = await validation.validateUpdateOne(payload);

    return this.repository.update(task, data);
  };
}
