import developmentLogger from './development.logger';
import productionLogger from './production.logger';
import { Logger } from 'winston';

let logger: Logger;

if (process.env.NODE_ENV !== 'production') {
  logger = developmentLogger;
} else {
  logger = productionLogger;
}

export default logger;
