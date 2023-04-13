import express from 'express';
import helmet from 'helmet';
import { morgan, notFoundHandler, errorHandler } from './middleware';
import { tasksRoutes, healthcheck } from './routes';

const app = express();

// Middleware
app.use(helmet());
app.use(morgan);
app.use(express.json());

// Routes
app.get('/', healthcheck);
app.use('/tasks', tasksRoutes);
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
