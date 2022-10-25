import express, { NextFunction, Request, Response } from 'express';
import { StatusError } from './interfaces';
import { tasksRoutes } from './routes';

const app = express();

app.use(express.json())

app.use('/tasks', tasksRoutes);

app.use((error: Error | StatusError, req: Request, res: Response, next: NextFunction) => {
    if('statusCode' in error) {
        res.status(error.statusCode).json(error.message);
    } else {
        res.status(500).json(error.message);
    }
})

export default app;