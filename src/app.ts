import express, { NextFunction, Request, Response } from 'express';
import { StatusError } from './interfaces';

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

app.use((error: Error | StatusError, req: Request, res: Response, next: NextFunction) => {
    if('statusCode' in error) {
        res.status(error.statusCode).json(error.message);
    } else {
        res.status(500).json(error.message);
    }
})

export default app;