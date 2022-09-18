import app from './app';
import config from 'config';

const port = config.get('server.port');

const server = app.listen(port, () => console.log(`Server running on port ${port}`))