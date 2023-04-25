import { Document, FilterQuery, SortOrder } from 'mongoose';
import { Task } from '../models';
import { ITask } from '../interfaces';

export class TaskRepository {
  async create(task: any) {
    return Task.create(task);
  }

  async findById(id: string) {
    return Task.findById(id);
  }

  async find(
    query: FilterQuery<ITask>,
    sort: { [key: string]: SortOrder },
    skip: number,
    limit: number
  ) {
    return Task.find(query).sort(sort).skip(skip).limit(limit);
  }

  async update(
    task: Document<unknown, any, ITask>,
    updateData: Partial<ITask>
  ) {
    for (const [key, value] of Object.entries(updateData)) {
      if (value) {
        (task as any)[key] = value;
      }
    }

    await task.save();

    return task;
  }

  async delete(task: Document<unknown, any, ITask>) {
    await task.remove();

    return task;
  }
}
