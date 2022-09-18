import config from 'config';
import app from './app';
import { db } from './utils';

const port = config.get('server.port');

db.connect();

const server = app.listen(port, () => console.log(`Server running on port ${port}`))