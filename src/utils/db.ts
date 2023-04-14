import mongoose from 'mongoose';
import config from 'config';
import logger from '../logger';
import util from 'util';
import { dbArgs } from '../interfaces';

const getDatabaseConfig = (): dbArgs => {
  return {
    uri: config.get('database.uri'),
    options: config.get('database.options')
  };
};

const debugLog = (
  collectionName: string,
  methodName: string,
  ...methodArgs: any[]
) => {
  const objToString = (obj: any) => {
    return util
      .inspect(obj, false, 10, true)
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ');
  };
  logger.debug(
    `\x1B[0;36mMongoose:\x1B[0m ${collectionName}.${methodName}` +
      `(${methodArgs.map(objToString).join(', ')})`
  );
};

export const connect = () => {
  mongoose.set('debug', debugLog);

  mongoose.connection.on('connected', () => logger.info('Mongoose connected'));
  mongoose.connection.on('disconnected', () =>
    logger.info('Mongoose disconnected')
  );
  mongoose.connection.on('error', (error) =>
    logger.error('Mongoose connection error: ', error)
  );

  const { uri, options } = getDatabaseConfig();

  mongoose.connect(uri, options);
};
