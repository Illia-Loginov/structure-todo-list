import { loggerTypes } from '../interfaces';
import developmentLogger from './development.logger';
import productionLogger from './production.logger';

export default (loggerType: loggerTypes) => {
  switch (loggerType) {
    case loggerTypes.development:
      return developmentLogger;
    case loggerTypes.production:
      return productionLogger;
    default:
      return developmentLogger;
  }
};
