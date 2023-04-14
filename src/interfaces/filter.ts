export interface dateRange {
  start?: Date;
  end?: Date;
}

export interface dateRangeQuery {
  $gte?: Date;
  $lt?: Date;
}

export interface filter {
  createdAt?: dateRange;
  deadline?: dateRange;
  completed?: dateRange;
  body?: string;
}

export interface regexQuery {
  $regex: string;
  $options: string;
}

export interface filterQuery {
  createdAt?: dateRangeQuery;
  deadline?: dateRangeQuery;
  completed?: dateRangeQuery;
  body?: regexQuery;
}

export type dateName = 'createdAt' | 'deadline' | 'completed';
