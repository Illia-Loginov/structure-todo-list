import express, { Application } from 'express';
import helmet from 'helmet';
import { httpLogger, notFoundHandler, errorHandler } from './middleware';
import { tasksRoutes, healthcheck } from './routes';

class AppBuilder {
  private app: Application;

  constructor() {
    this.app = express();
  }

  useUtilityMiddlewares() {
    this.app.use(httpLogger);
    this.app.use(express.json());
    return this;
  }

  useSecurityMiddlewares() {
    this.app.use(helmet());
    return this;
  }

  useTasksRoutes() {
    this.app.use('/tasks', tasksRoutes);
    return this;
  }

  useUtilityRoutes() {
    this.app.get('/', healthcheck);
    this.app.use(notFoundHandler);
    return this;
  }

  useGlobalErrorHandler() {
    this.app.use(errorHandler);
    return this;
  }

  build() {
    return this.app;
  }
}

export default AppBuilder;
