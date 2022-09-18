import mongoose from 'mongoose';
import config from 'config';

const uri: string = config.get('database.uri');
const options: mongoose.ConnectOptions | undefined = config.get('database.options');

export const connect = () => {
    if(process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
    }

    mongoose.connection.on('connected', () => console.log('Mongoose connected'));
    mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));
    mongoose.connection.on('error', error => console.error('Mongoose connection error: ', error));

    mongoose.connect(uri, options);
}