import config from 'config';
import app from './app';
import logger from './logger';
import { db } from './utils';
import { serverArgs } from './interfaces';

const getServerConfig = (): serverArgs => {
  return {
    port: Number(process.env.PORT || config.get('server.port')),
    serverRestartDelay: config.get('server.serverRestartDelay'),
    maxRetryAttempts: config.get('server.maxRetryAttempts')
  };
};

const startServer = ({
  port,
  serverRestartDelay,
  maxRetryAttempts,
  retryAttemptsCount = 0
}: serverArgs) => {
  const server = app.listen(port, () =>
    logger.info(`Server running on port ${port}`)
  );

  server.on('error', (error) => {
    logger.error('Server start error: ', error);
    server.close();

    if (retryAttemptsCount < maxRetryAttempts) {
      retryAttemptsCount++;
      logger.info(`Attempting to restart the server (${retryAttemptsCount})`);
      setTimeout(
        () =>
          startServer({
            port,
            serverRestartDelay,
            maxRetryAttempts,
            retryAttemptsCount
          }),
        serverRestartDelay
      );
    } else {
      logger.info(
        `Unable to restart the server after ${retryAttemptsCount} attempts`
      );
      process.exit(1);
    }
  });
};

const start = () => {
  db.connect();

  startServer({ ...getServerConfig(), retryAttemptsCount: 0 });
};

start();
