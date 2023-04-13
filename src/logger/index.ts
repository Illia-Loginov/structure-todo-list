import developmentLogger from './development.logger';
import productionLogger from './production.logger';

const logger =
  process.env.NODE_ENV !== 'production' ? developmentLogger : productionLogger;

export default logger;
