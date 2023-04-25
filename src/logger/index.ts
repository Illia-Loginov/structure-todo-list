import { loggerTypes } from '../interfaces';
import loggerFactory from './loggerFactory';

const logger = loggerFactory(
  process.env.NODE_ENV !== 'production'
    ? loggerTypes.development
    : loggerTypes.production
);

export default logger;
