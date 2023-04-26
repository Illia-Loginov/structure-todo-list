import { FilterQuery, SortOrder, Types } from 'mongoose';
import { Document } from 'mongoose';

export interface Repository<IEntity> {
  create(
    entity: any
  ): Promise<
    Document<unknown, any, IEntity> & IEntity & { _id: Types.ObjectId }
  >;
  findById(id: string): Promise<
    | (Document<unknown, any, IEntity> &
        IEntity & {
          _id: Types.ObjectId;
        })
    | null
  >;
  find(
    query: FilterQuery<IEntity>,
    sort: { [key: string]: SortOrder },
    limit: number,
    skip: number
  ): Promise<
    (Document<unknown, any, IEntity> &
      IEntity & {
        _id: Types.ObjectId;
      })[]
  >;
  update(
    entity: Document<unknown, any, IEntity>,
    updateData: Partial<IEntity>
  ): Promise<Document<unknown, any, IEntity>>;
  delete(
    entity: Document<unknown, any, IEntity>
  ): Promise<Document<unknown, any, IEntity>>;
}
