import { createLogger, format, transports } from 'winston';
const { combine, timestamp, errors, json } = format;

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        json()
    ),
    transports: [
        new transports.Console()
    ]
})

export default logger;