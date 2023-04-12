import morgan from 'morgan';
import logger from '../logger';

const stream = {
  write: (message: string) => logger.http(message)
};

const morganMiddleware = morgan(':method :url :status - :response-time ms', {
  stream
});

export default morganMiddleware;
