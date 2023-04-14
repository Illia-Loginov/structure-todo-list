import morgan from 'morgan';
import logger from '../logger';
import config from 'config';
import { Logger } from 'winston';
import { httpLoggerArgs } from '../interfaces';

const getHttpLoggerConfig = (): httpLoggerArgs => {
  return {
    format: config.get('httpLogger.format'),
    level: config.get('httpLogger.level')
  };
};

const createStream = (logger: Logger, level: httpLoggerArgs['level']) => {
  return {
    write: (message: string) => logger[level](message)
  };
};

const createHttpLoggerMiddleware = (
  logger: Logger,
  { format, level }: httpLoggerArgs
) => {
  return morgan(format, { stream: createStream(logger, level) });
};

export default createHttpLoggerMiddleware(logger, getHttpLoggerConfig());
