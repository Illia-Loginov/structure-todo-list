import mongoose from 'mongoose';
import config from 'config';
import logger from '../logger';
import util from 'util';

const uri: string = config.get('database.uri');
const options: mongoose.ConnectOptions | undefined = config.get('database.options');

export const connect = () => {
    mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
        const objToString = (obj: any) => {
            return util.inspect(obj, false, 10, true).replace(/\n/g, '').replace(/\s{2,}/g, ' ');
        }
        logger.debug(`\x1B[0;36mMongoose:\x1B[0m ${collectionName}.${methodName}`
            + `(${methodArgs.map(objToString).join(', ')})`);
    })

    mongoose.connection.on('connected', () => logger.info('Mongoose connected'));
    mongoose.connection.on('disconnected', () => logger.info('Mongoose disconnected'));
    mongoose.connection.on('error', error => logger.error('Mongoose connection error: ', error));

    mongoose.connect(uri, options);
}