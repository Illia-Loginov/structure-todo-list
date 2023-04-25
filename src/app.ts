import AppBuilder from './AppBuilder';

const app = new AppBuilder()
  .useUtilityMiddlewares()
  .useSecurityMiddlewares()
  .useTasksRoutes()
  .useUtilityRoutes()
  .useGlobalErrorHandler()
  .build();

export default app;
