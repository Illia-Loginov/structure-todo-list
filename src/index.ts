import config from 'config';
import app from './app';
import logger from './logger';
import { db } from './utils';

const port = process.env.PORT || config.get('server.port');

db.connect();

const server = app.listen(port, () =>
  logger.info(`Server running on port ${port}`)
);
