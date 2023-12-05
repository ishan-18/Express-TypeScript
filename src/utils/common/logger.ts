import { createLogger, format, transports } from 'winston';

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

const logger = createLogger({
    format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.printf(({ level, message, timestamp, stack }) => {
            return `${timestamp} ${level}: ${message} - ${stack || ''}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' }),
    ],
});

export default logger;
