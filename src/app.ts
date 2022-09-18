import express, { NextFunction, Request, Response } from 'express';
import { StatusError } from './interfaces';

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

export default app;